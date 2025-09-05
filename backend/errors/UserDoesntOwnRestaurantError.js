import { AppError } from "./AppError.js";

export class UserDoesntOwnRestaurantError extends AppError {
    constructor(username, restaurantId){
        super(`User ${username} doesn't own restaurant with id ${restaurantId}.`, 403);
    }
}