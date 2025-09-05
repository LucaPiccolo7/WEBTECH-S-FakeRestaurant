import { body } from 'express-validator';

export const userValidators = [
    body('username')
    .trim()
    .notEmpty().withMessage('You must specify an username.')
    .isString()
    .isLength({min: 5}).withMessage('Username must be at minimum 5 characters long.')
    .escape(),

    body('password')
    .trim()
    .notEmpty().withMessage('You must specify a password.')
    .isString()
    .isLength({min: 5, max: 15}).withMessage('Password must be at minimum 5 characters long.')
    .escape(),
];