import { DataTypes } from 'sequelize';
import { ReviewService } from '../services/ReviewService.js';

export function createModel(database){
    database.define(
        'Vote',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            type: {
                type: DataTypes.ENUM('upvote', 'downvote'),
                allowNull: false,
            }
        },
        {
            //altre opzioni del model
            hooks: {
                afterCreate: async (vote) => {
                    if(vote.type === 'upvote'){
                        await ReviewService.incrementPopularity(vote.ReviewId);
                        await ReviewService.incrementUpvotes(vote.ReviewId);
                    } else {
                        await ReviewService.decrementPopularity(vote.ReviewId);
                        await ReviewService.incrementDownvotes(vote.ReviewId);
                    }
                },
                afterDestroy: async (vote) => {
                    if(vote.type === 'upvote'){
                        await ReviewService.decrementPopularity(vote.ReviewId);
                        await ReviewService.decrementUpvotes(vote.ReviewId);
                    } else {
                        await ReviewService.incrementPopularity(vote.ReviewId);
                        await ReviewService.decrementDownvotes(vote.ReviewId);
                    }
                },
            }
        }
    );
}