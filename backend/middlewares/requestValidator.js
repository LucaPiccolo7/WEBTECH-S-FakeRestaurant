import { matchedData, validationResult } from "express-validator";
import { ValidationError } from "../errors/ValidationError.js"

export function requestValidator(req, res, next){

    const result = validationResult(req);
    
    if(result.isEmpty()){
        const validatedData = matchedData(req);
        req.validatedData = validatedData;
    } else {
        throw new ValidationError(result.array());
    }

    next();
}
