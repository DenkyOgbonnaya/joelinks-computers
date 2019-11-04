import {Router} from "express";
const productRouter= Router();
import productController from "./products-controller";

const{
    addProduct,
    getAllProducts,
    getSingleProduct,
    editProduct,
    deleteProduct
} = productController;

productRouter.route('/products')
.post(addProduct)
.get(getAllProducts)

productRouter.route('/products/:id')
.get(getSingleProduct)
.put(editProduct)
.delete(deleteProduct)

const api ={
    path: '/api',
    router: productRouter
}
export default api;
