import {Router} from "express";
const productRouter= Router();
import productController from "./products-controller";
import upload from "../../utills/config/multer-config";

const{
    addProduct,
    getAllProducts,
    getSingleProduct,
    editProduct,
    deleteProduct,
    searchProduct, 
    getProductByCat
} = productController;

productRouter.route('/products')
.post(upload.array('image', 4), addProduct)
.get(getAllProducts)

productRouter.route('/products/:id')
.get(getSingleProduct)
.put(editProduct)
.delete(deleteProduct)

productRouter.get("/product/search", searchProduct)
productRouter.get("/product/category/:name", getProductByCat)
const api ={
    path: '/api',
    router: productRouter
}
export default api;
