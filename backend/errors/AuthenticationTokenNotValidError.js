import { AppError } from "./AppError.js";

export class AuthenticationTokenNotValidError extends AppError {
    constructor(){
        super(`Authentication token is invalid or expired! Please log in again`, 401);
    }
}