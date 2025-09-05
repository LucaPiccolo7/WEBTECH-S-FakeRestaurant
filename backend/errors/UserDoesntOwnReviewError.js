import { AppError } from "./AppError.js";

export class UserDoesntOwnReviewError extends AppError {
    constructor(username, reviewId){
        super(`User with username ${username} doesn't own review with id ${reviewId}`, 403);
    }
}