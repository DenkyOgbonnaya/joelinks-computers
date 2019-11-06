import { Router } from "express";
import reviewController from "./review-controller";

const reviewRouter = Router();
const{
    createReview,
    getReviews,
    editReview,
    deleteReview
} = reviewController;

reviewRouter.route("/reviews/:productId")
.post(createReview)
.get(getReviews)
reviewRouter.route("/reviews/:reviewId")
.put(editReview)
.delete(deleteReview)

const api = {
    path: "/api",
    router: reviewRouter
}

export default api;