import { Router } from "express";
import categoriesController from "./categories-controller";
import { isLoggedIn, isAdmin} from "../../middlewares/authorization";

const categoryRouter = Router();
const{addCategory, getCategoies, editCategory, deleteCategory} = categoriesController;

categoryRouter.route('/categories')
.post(isLoggedIn, isAdmin, addCategory)
.get(getCategoies)

categoryRouter.route('/categories/:id')
.put(isLoggedIn, isAdmin, editCategory)
.delete(isLoggedIn, isAdmin, deleteCategory)
 const api =  {
    path: '/api',
    router: categoryRouter
}
export default api;