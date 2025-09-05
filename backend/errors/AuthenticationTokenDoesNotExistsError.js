import { AppError } from "./AppError.js";

export class AuthenticationTokenDoesNotExistsError extends AppError {
    constructor(){
        super(`Authentication token doesn't exists! Please log in again`, 401);
    }
}