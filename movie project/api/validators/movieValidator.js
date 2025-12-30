import {body} from 'express-validator';

export const movieValidator = [
    body('title').notEmpty().isLength({max: 255}).withMessage('Invalid title'),
    body('plot').notEmpty().isLength({min: 10}).withMessage('Plot minimum 10 characters'),
    body('director').notEmpty().withMessage('Director required'),
    body('releaseYear').notEmpty().isInt({min: 1900, max: 2100}).withMessage(`Invalid release year`),
    body('genres').notEmpty().isArray({min: 1}).withMessage('At least one genre required'),
    body('runtime').notEmpty().isInt({min: 30}).withMessage('Invalid runtime'),
    body('posterUrl').isURL().withMessage('Invalid URL'),
];