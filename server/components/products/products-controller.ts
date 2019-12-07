import {Request, Response, NextFunction} from "express";
import productService from "./products-service";
import { IProduct } from "./product";
import { dataUri } from "../../utills/config/multer-config";
import { uploader } from "../../utills/config/cloudinary-config";
import { uploadImagesToCloudinary } from "./products-helper";
import { productsEvents } from ".";

const{
    add,
    getProducts,
    getSingle,
    edit,
    deleteOne,
    getProductsCount,
    searchProduct,
    getSimilar,
    getByCategory,
    reserve,
    rollbackReservation,
    pullReservation,
    returnProducts,
    deleteImage

} = productService;
const  productController = {

    async addProduct(req: any, res: Response){

        if(req.files.length === 0)
            return res.status(400).send({message: "Atleast one product image is required"})
        const images = await uploadImagesToCloudinary(req.files, dataUri, uploader);

        const newProduct = {
           ...req.body,
           attributes: JSON.parse(req.body.attributes),
           images
        }
        try {
            const product = await add(newProduct);
            res.status(201).send({product, message: "Product Successfully added!"});
        } catch (err) {
            console.log(err);
            
            res.status(500).send(err.message);
        }
        
    },
    async getAllProducts(req: Request, res: Response){
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const offset = (page*limit) - limit;
        try {
            const products = await getProducts(offset, limit);
            const productsCount = await getProductsCount();

            return res.status(200).send({
                products,
                page,
                pages: Math.ceil(productsCount/limit),
                total: products.length
            })
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    async getSingleProduct(req: Request, res: Response){
        const{id} =req.params;
        try {
            const product = await getSingle(id);
            if(product){
                const similarProduct = await getSimilar(product.category);
                const filtered = similarProduct.filter( (item:IProduct) => item._id != product._id);
                
                return res.status(200).send({product, similarProducts: filtered});
            }
            return res.status(404).send({message: 'Could not find this product'})
        } catch (err) {
            console.log(err);
            
            res.status(500).send(err.message);
        }
    },
    async editProduct(req:any, res:Response){
        const{id} = req.params;
        const{images} = req.body;
        let {attributes} = req.body;
        
        if(images.length === 0 && (req.files && req.files.length === 0) )
            return res.status(400).send({message: "Atleast one product image is required"})
        const newImages = await uploadImagesToCloudinary(req.files, dataUri, uploader);
        
        const credentials = {
            ...req.body,
            attributes: JSON.parse(attributes),
        }
        try {
            const product = await edit(id, credentials);
            if(product){
                if(newImages && newImages.length > 0){
                    let productsImageCopy = JSON.parse(product.images);
                    
                    let images = productsImageCopy.concat(newImages)
                    product.images = images;
                    product.save()
                }else{
                    //for weird reasons when a product credentials is edited without new images
                    //the images array becomes searialized.
                    //this block will unsearialize it
                    let productsImageCopy = JSON.parse(product.images);
                    product.images = productsImageCopy;
                    product.save();
                }
                return res.status(200).send({product, message: "Product edited successfully"});
            }
            return res.status(400).send({message: "No such product exist"})
        } catch (err) {
            res.status(500).send(err.message);
            
        }
    },
    async deleteProduct(req:Request, res: Response){
        const{id} = req.params;
        try {
            const product = await deleteOne(id);
            if(product){
                const productImagesCopy = product.images;
                productImagesCopy.forEach( (image:any) => productsEvents.emit("deleteImage", image.id, uploader) )
                return res.status(200).send({message:"Product deleted successfully"});
            }
            return res.status(400).send({message: "No such product exist"})
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    async deleteProductImage(req:Request, res: Response){
        const{id} = req.params;
        const{imageId} = req.query;
        try {
            const product = await deleteImage(id, imageId);
            if(product){
                //delete from cloudinary
                productsEvents.emit("deleteImage", imageId, uploader);
                return res.status(200).send({message: "image deleted successfully"});
            }
            return res.status(400).send({message: "failed to delete image"});
        } catch (err) {
            console.log(err);
            
            res.status(500).send(err);
        }

    },
    async searchProduct(req:Request, res:Response){
        const{search} = req.query;
        const query:any = {};

        if(search)
            query.name = {$regex: search, $options: 'i'};
        try{
            const products = await searchProduct(query); 
            
            if(products.length>0)
            return res.status(200).send({products})
            return res.status(401).send({message: 'This product could not be found'});
        }catch(err){
            res.status(500).send(err);
        }
    },
    async getProductByCat(req:Request, res: Response){
        const {name} = req.params;

        try {
            const products = await getByCategory(name);
            return res.status(200).send({
                products,
                page: 1,
                pages: 1
            });
        } catch (err) {
            res.status(500).send(err);
        }
    },
    //reserve the products quantiy purchased in the cart
    async reserveProducts(req:Request, res: Response, next:NextFunction){
        const sessionId = req.sessionID || "";
        const cart = req.session && req.session.cart;
        
        let success = [];
        let failed = [];

        for(let i = 0; i < cart.length; i+=1){
            let product = cart[i];

            try {
                let result = await reserve(product._id, sessionId, product.quantity);
                if(result){
                    success.push(product)
                }else failed.push(product)
            } catch (err) {
                console.log(err);
                
            }
        }
        //rollback all the successful reservations back to the product
        if(failed.length > 0){
           for(let i=0; i<success.length; i+=1){ 
               let product = success[i];
               await rollbackReservation(product._id, sessionId, product.quantity);
           }
           return res.status(400).send({message: "The products requested are out of stock!"})
        } else {
            //else create order, release all reservation from the inventories, clear cart
            next();
        }
    },
    // release reservations for successfully checkout
    async releaseReservations(cart:any, cartId:string){
        console.log(cart, 'release');
        
        for(let i=0; i<cart.length; i+=1){
            try {
                return await pullReservation(cartId);
            } catch (err) {
                throw err;
            }
        }
            
    },
    //return products quantity to inventry on failed checkout
    async returnProducts(cart:any, cartId:string){
        console.log(cart, 'return');
        
        for(let i=0; i<cart.length; i+=1){
            let product = cart[i]
            try {
                return await returnProducts(product._id, cartId, product.quantity);
            } catch (err) {
                throw err;
            }
        }
            
    }
    
}

export default productController;