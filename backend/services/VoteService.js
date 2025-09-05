import { Vote } from "../models/Database.js";
import { InvalidVoteTypeError } from '../errors/InvalidVoteTypeError.js';

export class VoteService {

    static async createVote(req){
        return await Vote.create({
            type: req.validatedData.type,
            ReviewId: req.validatedData.reviewid,
        },
        {
            fields: ['type', 'ReviewId'],
        }
        );
    }

    static async getReviewVotes(req){
        if(req.validatedData.type)
            return await VoteService.getVotesByType(req);
        else
            return await VoteService.getAllVotes(req);
    }

    static async getAllVotes(req){
        return await Vote.findAll({
            attributes: ['id', 'type', 'ReviewId'],
            where: {
                ReviewId: req.validatedData.reviewid
            }
        });
    }

    static async getVotesByType(req){
        return await Vote.findAll({
            attributes: ['id', 'type', 'ReviewId'],
            where: {
                type: req.validatedData.type,
                ReviewId: req.validatedData.reviewid
            }
        });
    }

    static async getVotesNumberByType(reviewid, type){
        return await Vote.findAll({
            attributes: [sequelize.fn('COUNT', sequelize.col('type')), type],
            where: {
                type: type,
                ReviewId: reviewid,
            }
        });
    }

    static async deleteVote(req){
        const vote = await Vote.findOne({
            attributes: ['id', 'type', 'ReviewId'],
            where: {
                type: req.validatedData.type,
                ReviewId: req.validatedData.reviewid,
            }
        });
        if(vote)
            await vote.destroy();
    }

    static async checkVoteType(req){
        if(req.validatedData.type){
            if((req.validatedData.type !== 'upvote') && (req.validatedData.type !== 'downvote'))
                throw new InvalidVoteTypeError(req.validatedData.type);
        }
    }
}
