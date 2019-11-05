import { Router } from "express";
import categoriesController from "./categories-controller";

const categoryRouter = Router();
const{addCategory, getCategoies, editCategory} = categoriesController;

categoryRouter.route('/categories')
.post(addCategory)
.get(getCategoies)

categoryRouter.route('/categories/:id')
.put(editCategory)
 const api =  {
    path: '/api',
    router: categoryRouter
}
export default api;