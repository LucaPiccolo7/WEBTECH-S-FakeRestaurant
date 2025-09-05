import { AppError } from "./AppError.js";

export class UserDoesntExistsError extends AppError {
    constructor(username){
        super(`User with username ${username} doesn't exists!`, 404);
    }
}