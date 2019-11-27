import { Request, Response } from "express";
import categoriesService from "./categories-service";

const{add, getAll, edit, deleteCategory} = categoriesService;
const categoriesController = {
    async addCategory(req:Request, res: Response){
        try {
            const category = await add(req.body);
            res.status(201).send({category, message:"Category successfully added!"});
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    async getCategoies(req:Request, res: Response){
        try {
            const categories = await getAll();
            res.status(200).send({categories});
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    async editCategory(req:Request, res: Response){
        const{id} = req.params;
        try {
            const category = await edit(id, req.body);
            if(category)
                return res.status(200).send({message: "Category succefully updated", category});
            return res.status(404).send({message: "Not  found"});
            
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    async deleteCategory(req:Request, res: Response){
        const{id} = req.params;
        try {
            const category = await deleteCategory(id);
            if(category)
                return res.status(200).send({message: "Category succefully deleted"});
            return res.status(404).send({message: "Not  found"});
            
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

}

export default categoriesController;