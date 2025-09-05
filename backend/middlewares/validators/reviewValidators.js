import { body, param } from 'express-validator';

export const createReviewValidators = [
    body('message')
    .trim()
    .notEmpty().withMessage('You must specify a message.')
    .isString()
    .isLength({min: 1, max: 150}).withMessage('Review message must be between 1 and 100 characters')
    .escape(),
];

export const reviewIdValidator = [
    param('reviewid')
    .trim()
    .notEmpty().withMessage('You must specify a review id')
    .isInt({min: 1}).withMessage('Request param error.')
    .escape(),
];