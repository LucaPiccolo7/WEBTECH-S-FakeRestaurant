import { AppError } from "./AppError.js";

export class RestaurantDoesntOwnReviewError extends AppError {
    constructor(restaurantId, reviewId){
        super(`Restaurant with id ${restaurantId} doesn't own review with id ${reviewId}`, 403);
    }
}