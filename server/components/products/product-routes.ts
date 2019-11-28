import {Router} from "express";
const productRouter= Router();
import productController from "./products-controller";
import upload from "../../utills/config/multer-config";
import { isLoggedIn, isAdmin} from "../../middlewares/authorization";

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
.post(isLoggedIn, isAdmin, upload.array('image', 4), addProduct)
.get(getAllProducts)

productRouter.route('/products/:id')
.get(getSingleProduct)
.put(isLoggedIn, isAdmin, editProduct)
.delete(isLoggedIn, isAdmin, deleteProduct)

productRouter.get("/product/search", searchProduct)
productRouter.get("/product/category/:name", getProductByCat)
const api ={
    path: '/api',
    router: productRouter
}
export default api;
