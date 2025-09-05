import { AppError } from "./AppError.js";

export class UserAlreadyExistsError extends AppError {
    constructor(username){
        super(`User with username ${username} already exists!`, 409);
    }
}