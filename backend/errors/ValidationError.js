import { AppError } from "./AppError.js";

export class ValidationError extends AppError {
    constructor(validationErrors){
        super(`Validation errors`, 400);
        this.validationErrors = validationErrors;
    }
}