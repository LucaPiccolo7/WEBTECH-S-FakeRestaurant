import { body, param, query } from 'express-validator';

export const createRestaurantValidators = [
    body('name')
    .trim()
    .notEmpty().withMessage('You must specify a name')
    .isString()
    .isLength({min: 1, max: 50}).withMessage('Restaurant name must be between 1 and 100 characters')
    .escape(),

    body('description')
    .trim()
    .notEmpty().withMessage('You must specify a description')
    .isString()
    .isLength({min: 1, max: 150}).withMessage('Restaurant description must be between 1 and 200 characters')
    .escape(),

    body('latitude',)
    .trim()
    .notEmpty().withMessage('You must specify a latitude')
    .isDecimal({ min: -90, max: 90 }).withMessage('Restaurant latitude must be between -90 and 90')
    .escape(),

    body('longitude')
    .trim()
    .notEmpty().withMessage('You must specify a longitude')
    .isDecimal({ min: -180, max: 180 }).withMessage('Restaurant longitude must be between -180 and 180')
    .escape()
];

export const restaurantSearchValidator = [
    query('name')
    .optional()
    .trim()
    .notEmpty()
    .isString()
    .escape(),
];

export const restaurantIdValdator = [
    param('restaurantid')
    .trim()
    .notEmpty().withMessage('You must specify a restaurant id')
    .isInt({min: 1})
    .escape(),
]