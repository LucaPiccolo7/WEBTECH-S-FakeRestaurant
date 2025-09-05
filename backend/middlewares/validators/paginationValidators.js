import { query } from "express-validator";

export const paginationValidators = [
    query('size')
    .trim()
    .notEmpty().withMessage('You must specify a size.')
    .isInt({min: 1})
    .escape(),

    query('page')
    .trim()
    .notEmpty().withMessage('You must specify a page.')
    .isInt({min: 1})
    .escape(),
];