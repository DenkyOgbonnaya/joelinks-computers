import {Request, Response} from "express";
import productService from "./products-service";

const{
    add,
    getProducts,
    getSingle,
    edit,
    deleteOne

} = productService;
const  productController = {

    async addProduct(req: Request, res: Response){
        try {
            const product = await add(req.body);
            res.status(201).send({product});
        } catch (err) {
            res.status(500).send(err.message);
        }
        
    },
    async getAllProducts(req: Request, res: Response){
        try {
            const products = await getProducts();
            res.status(200).send({products})
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    async getSingleProduct(req: Request, res: Response){
        const{id} =req.params;
        try {
            const product = await getSingle(id);
            if(product)
                return res.status(200).send({product});
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
                return res.status(200).send({message:"Product edited successfully", product});
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
    }
}

export default productController;