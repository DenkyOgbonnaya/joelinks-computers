import { Request, Response } from "express";
import reviewService from "./review-service";

const{
    create,
    getAll,
    edit,
    deleteSingle
} = reviewService;

const reviewController = {
    async createReview(req:Request, res: Response){
        const{productId} = req.params;
        const{username, comment} = req.body;
        try {
            const review = await create({
                productId,
                username,
                comment
            });
            res.status(201).send({review, message:"review created", status: "success"});
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async getReviews(req:Request, res: Response){
        const{productId} = req.params;
        try {
            const reviews = await getAll(productId);
            res.status(200).send({reviews,  status: "success"});
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async editReview(req:Request, res: Response){
        const{reviewId} = req.params;
        const{username, comment} = req.body;
        try {
            const review = await edit(reviewId, {username, comment});
            if(review)
                return res.status(200).send({review, message:"review edited", status: "success"});
            return res.status(400).send({message:"Invalid review id", status: "error"});
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async deleteReview(req:Request, res: Response){
        const{reviewId} = req.params;
        try {
            const review = await deleteSingle(reviewId);
            if(review)
                return res.status(200).send({message:"review deleted", status: "success"});
            return res.status(400).send({message:"Invalid review id", status: "error"});
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

export default reviewController;