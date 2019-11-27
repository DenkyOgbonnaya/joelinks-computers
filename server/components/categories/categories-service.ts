import Category from "./categories-model";
import { ENGINE_METHOD_DIGESTS } from "constants";

const categoriesService = {
    async add(name:string){
        try {
            return await Category.create(name);
        } catch (err) {
            throw err;
        }
    },
    async getAll(){
        try {
            return await Category.find({});
        } catch (err) {
            throw err
        }
    },
    async edit (id:any, data:any){
        try {
            return Category.findByIdAndUpdate(id, {$set: data})
        } catch (err) {
            throw err;
        }
    },
    async deleteCategory (id:string) {
        try {
            return Category.findByIdAndDelete(id);
        } catch (err) {
            throw err;
        }
    }
}
export default categoriesService;