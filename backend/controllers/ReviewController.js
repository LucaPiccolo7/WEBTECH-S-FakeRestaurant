import { ReviewService } from "../services/ReviewService.js";

export class ReviewController {

    static async createNewReview(req, res, next){
        ReviewService.createReview(req)
        .then((review) => {
            res.status(201);
            res.json(review);
        })
        .catch((error) => {
            next(error);
        });
    }

    static async getRestaurantReviews(req, res, next){
        ReviewService.getRestaurantReviews(req)
        .then((results) => {
            res.status(200);
            res.json({
                totalReviews: results.count,
                reviews: results.rows,
            });
        })
        .catch((error) => {
            next(error);
        })
    }

    static async getUserReviews(req, res, next){
        ReviewService.getUserReviews(req)
        .then((results) => {
            res.status(200);
            res.json({
                totalReviews: results.count,
                reviews: results.rows,
            });
        })
        .catch((error) => {
            next(error);
        })
    }

    static async getReviewById(req, res, next){
        ReviewService.getReviewById(req.validatedData.reviewid)
        .then((review) => {
            res.status(200);
            res.json(review);
        })
        .catch((error) => {
            next(error);
        })
    }

    static async checkReviewExists(req, res, next){
        ReviewService.checkReviewExists(req.validatedData.reviewid)
        .then(() => {
            next();
        })
        .catch((error) => {
            next(error);
        });
    }

    static async deleteReview(req, res, next){
        ReviewService.deleteReview(req.validatedData.reviewid)
        .then(() => {
            res.status(204);
            res.end();
        })
        .catch((error) => {
            next(error);
        });
    }
}