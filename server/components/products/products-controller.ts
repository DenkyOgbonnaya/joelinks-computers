import {Request, Response} from "express";
import productService from "./products-service";
import { IProduct } from "./product";

const{
    add,
    getProducts,
    getSingle,
    edit,
    deleteOne,
    getProductsCount,
    searchProduct,
    getSimilar,
    getByCategory

} = productService;
const  productController = {

    async addProduct(req: any, res: Response){
        let images = [];
        const{name, price, discountedPrice, brand, quantity, category, description, attributes} = req.body;

        if(req.files.length > 0){
            for(let i=0; i< req.files.length; i+=1){
                images.push(`/public/uploads/${req.files[i].filename}`)
            }
        }else {
            return res.status(400).send({message: "Atleast one product image is required"})
        }
        const newProduct = {
            name,
            price,
            discountedPrice,
            brand,
            quantity,
            category,
            description,
            attributes,
            images
        }
        try {
            const product = await add(newProduct);
            res.status(201).send({product, message: "Product Successfully added!"});
        } catch (err) {
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
    async editProduct(req:Request, res:Response){
        const{id} = req.params;
        try {
            const product = await edit(id, req.body);
            if(product)
                return res.status(200).send({product, message: "Product edited successfully"});
            return res.status(400).send({message: "No such product exist"})
        } catch (err) {
            res.status(500).send(err.message);
            
        }
    },
    async deleteProduct(req:Request, res: Response){
        const{id} = req.params;
        try {
            const product = await deleteOne(id);
            if(product)
                return res.status(200).send({message:"Product deleted successfully"});
            return res.status(400).send({message: "No such product exist"})
        } catch (err) {
            res.status(500).send(err.message);
            
        }
    },
    async searchProduct(req:Request, res:Response){
        const{search} = req.query;
        const limit = 10;
        const query:any = {};

        if(search)
            query.name = {$regex: search, $options: 'i'};
        try{
            const products = await searchProduct(query); 
            
            if(products.length>0)
            return res.status(200).send({
                products,
                page: 1,
                pages: Math.ceil(products.length/limit)
                
            })
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
}
}

export default productController;