import { AppError } from "./AppError.js";

export class InvalidVoteTypeError extends AppError {
    constructor(voteType){
        super(`Vote type ${voteType} is invalid. Please enter 'upvote' or 'downvote'.`, 400);
    }
}