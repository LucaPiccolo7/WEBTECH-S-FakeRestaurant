import { AppError } from "./AppError.js";

export class RestaurantDoesntExistsError extends AppError {
    constructor(restaurantId){
        super(`Restaurant with id ${restaurantId} doesen't exists!`, 404);
    }
}