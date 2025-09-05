import { VoteService } from "../services/VoteService.js";

export class VoteController {

    static async addVote(req, res, next){
        VoteService.createVote(req)
        .then((vote) => {
            res.status(201);
            res.json(vote);
        })
        .catch((error) => {
            next(error);
        });
    }

    static async getReviewVotes(req, res, next){
        VoteService.getReviewVotes(req)
        .then((votes) => {
            res.status(200);
            res.json(votes);
        })
        .catch((error) => {
            next(error);
        });
    }
    
    static async removeVote(req, res, next){
        VoteService.deleteVote(req)
        .then(() => {
            res.status(204);
            res.end();
        })
        .catch((error) => {
            next(error);
        });
    }

    static async checkVoteType(req, res, next){
        VoteService.checkVoteType(req)
        .then(() => {
            next();
        })
        .catch((error) => {
            next(error);
        });
    }
}