import Review from "./reviews-model";

type review = {
    productId: any,
    username: string,
    comment: string
}
const reviewService = {
    async create(review: review){
        try {
            return await Review.create(review);
        } catch (err) {
            throw err;
        }
    },
    async getAll(productId:string){
        try {
            return await Review.find({productId});
        } catch (err) {
            throw err;
        }
    },
    async edit(reviewId:string, data:any){
        try {
            return await Review.findByIdAndUpdate(reviewId, {$set: data}, {new:true});
        } catch (err) {
            throw err;
        }
    },
    async deleteSingle(reviewId:string){
        try {
            return await Review.findByIdAndRemove(reviewId);
        } catch (err) {
            throw err;
        }
    },
}
export default reviewService;