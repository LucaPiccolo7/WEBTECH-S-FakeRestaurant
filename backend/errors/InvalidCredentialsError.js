import { AppError } from "./AppError.js";

export class InvalidCredentialsError extends AppError {
    constructor(username){
        super(`Invalid password for user ${username}`, 401);
    }
}