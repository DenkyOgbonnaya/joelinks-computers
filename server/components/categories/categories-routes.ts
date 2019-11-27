import { Router } from "express";
import categoriesController from "./categories-controller";

const categoryRouter = Router();
const{addCategory, getCategoies, editCategory, deleteCategory} = categoriesController;

categoryRouter.route('/categories')
.post(addCategory)
.get(getCategoies)

categoryRouter.route('/categories/:id')
.put(editCategory)
.delete(deleteCategory)
 const api =  {
    path: '/api',
    router: categoryRouter
}
export default api;