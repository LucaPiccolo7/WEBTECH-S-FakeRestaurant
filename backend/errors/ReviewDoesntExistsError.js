import { AppError } from "./AppError.js";

export class ReviewDoesntExistsError extends AppError {
    constructor(reviewId){
        super(`Review with id ${reviewId} doesn't exists!`, 404);
    }
}