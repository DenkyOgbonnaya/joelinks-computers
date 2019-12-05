import {Router} from "express";
const productRouter= Router();
import productController from "./products-controller";
import {multerUploads} from "../../utills/config/multer-config";
import { isLoggedIn, isAdmin} from "../../middlewares/authorization";
import validationResult from "../../middlewares/validation";
import { validateProduct } from "./product-validation";

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
.post(isLoggedIn, isAdmin,  multerUploads.array('image', 4), validateProduct, validationResult, addProduct)
.get(getAllProducts)

productRouter.route('/products/:id')
.get(getSingleProduct)
.put(isLoggedIn, isAdmin,  multerUploads.array('image', 4), validateProduct, validationResult, editProduct)
.delete(isLoggedIn, isAdmin, deleteProduct)

productRouter.get("/product/search", searchProduct)
productRouter.get("/product/category/:name", getProductByCat)
const api ={
    path: '/api',
    router: productRouter
}
export default api;
