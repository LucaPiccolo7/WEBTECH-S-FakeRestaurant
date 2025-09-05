import { query } from 'express-validator';

export const voteOptionalValidators = [
    query('type')
    .optional()
    .trim()
    .isString()
    .escape(),
];

export const voteStrictValidators = [
    query('type')
    .trim()
    .notEmpty().withMessage('You must specify a vote type (downvote or upvote).')
    .isString()
    .escape(),
];