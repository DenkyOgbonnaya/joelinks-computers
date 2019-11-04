import Product from "./products-model";

const productService =  {
    async add(product: any){
        try {
            return await Product.create(product);
        } catch (err) {
            throw err;
        }
    },
    async getProducts(){
        try {
            return await Product.find({});
        } catch (err) {
            throw err;
        }
    },
    async getSingle(id:any){
        try {
            return await Product.findById(id);
        } catch (err) {
            throw err;
        }
    },
    async edit(id:any, data:any){
        try {
            return await Product.findByIdAndUpdate(id, {$set: data}, {new: true})
        } catch (err) {
            throw err;
        }
    },
    async deleteOne(id:any){
        try {
            return await Product.findByIdAndRemove(id);
        } catch (err) {
            throw err;
        }
    }
}
export default productService;