import { Review } from "../models/Database.js";
import { ReviewDoesntExistsError } from "../errors/ReviewDoesntExistsError.js";
import { VoteService } from "./VoteService.js";

export class ReviewService {

    static async createReview(req){
        return await Review.create(
        {
            message: req.validatedData.message,
            UserUsername: req.username,
            RestaurantId: req.validatedData.restaurantid,
        }, 
        {
            fields: ['message', 'UserUsername', 'RestaurantId'],
        });
    }

    static async getReviewById(reviewId){
        return await Review.findByPk(reviewId);
    }

    static async incrementPopularity(reviewId){
        const review = await ReviewService.getReviewById(reviewId);
        review.popularity++;
        await review.save();
    }

    static async decrementPopularity(reviewId){
        const review = await ReviewService.getReviewById(reviewId);
        review.popularity--;
        await review.save();
    }

    static async incrementUpvotes(reviewId){
        const review = await ReviewService.getReviewById(reviewId);
        review.upvotes++;
        await review.save();
    }

    static async decrementUpvotes(reviewId){
        const review = await ReviewService.getReviewById(reviewId);
        review.upvotes--;
        await review.save();
    }

    static async incrementDownvotes(reviewId){
        const review = await ReviewService.getReviewById(reviewId);
        review.downvotes++;
        await review.save();
    }

    static async decrementDownvotes(reviewId){
        const review = await ReviewService.getReviewById(reviewId);
        review.downvotes--;
        await review.save();
    }

    static async getRestaurantReviews(req){
        const page = req.validatedData.page || 1
		const size = req.validatedData.size || 5
		const start = (page - 1) * size;
        return await Review.findAndCountAll({
            attributes: ['id', 'message', 'popularity', 'upvotes', 'downvotes', 'UserUsername', 'RestaurantId'],
            offset: start,
			limit: size,
            order: [['popularity', 'DESC']],
            where: {
                RestaurantId: req.validatedData.restaurantid,
            },
        })
    }

    static async getUserReviews(req){
        const page = req.validatedData.page || 1
		const size = req.validatedData.size || 5
		const start = (page - 1) * size;
        return await Review.findAndCountAll({
            attributes: ['id', 'message', 'popularity', 'upvotes', 'downvotes', 'UserUsername', 'RestaurantId'],
            offset: start,
			limit: size,
            where: {
                UserUsername: req.username,
            }
        });
    }

    static async deleteReview(reviewId){
        const review = await ReviewService.getReviewById(reviewId);
        await review.destroy();
    }

    static async checkReviewExists(reviewId){
        const review = await ReviewService.getReviewById(reviewId);
        if(!review)
            throw new ReviewDoesntExistsError(reviewId);
        else return review;
    }

    static async checkReviewOwnedByRestaurant(restaurantId, reviewId){
        return (await ReviewService.getReviewById(reviewId)).RestaurantId == restaurantId;
    }

    static async checkReviewOwnedByUser(username, reviewId){
        return (await ReviewService.getReviewById(reviewId)).UserUsername === username;
    }
}