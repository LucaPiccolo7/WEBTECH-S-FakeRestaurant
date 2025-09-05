import express from 'express';

import { restaurantIdValdator } from '../middlewares/validators/restaurantValidators.js';
import { reviewIdValidator } from '../middlewares/validators/reviewValidators.js';
import { paginationValidators } from '../middlewares/validators/paginationValidators.js';

import { requestValidator } from '../middlewares/requestValidator.js';
import { enforceAuthentication } from '../middlewares/enforceAuthentication.js';
import { createReviewValidators } from '../middlewares/validators/reviewValidators.js';
import { ensureRestaurantOwnsReview, ensureUserOwnsReview } from '../middlewares/enforceAuthorization.js';

import { ReviewController } from '../controllers/ReviewController.js';
import { RestaurantController } from '../controllers/RestaurantController.js';

export const reviewRouter = express.Router();

// ROUTES PUBBLICHE

/** 
 * Recupera tutte le review associate ad un ristorante
 * Verifica che il restaurantId rappresenta un ristorante reale, altrimenti viene lanciato RestaurantDoentExistsError
 * 
 * url: fakerestaurant.com/restaurants/{restaurantId}/reviews
 */
reviewRouter.get('/restaurants/:restaurantid/reviews', [
    restaurantIdValdator,
    paginationValidators,
    requestValidator,
    RestaurantController.checkRestaurantExists,
    ReviewController.getRestaurantReviews,
]);

/**
 * Recupera una specifica review associata ad un ristorante
 * Verifica che il restaurantId rappresenta un ristorante reale, altrimenti viene lanciato RestaurantDoentExistsError
 * Verifica che il reviewId rappresenti una review reale, altrimenti viene lanciato un ReviewDoesntExistsError
 * Verifica che il reviewId rappresenti una recensione pubblicata per il ristorante restaurantId, altrimenti viene lanciato un ReviewDoesntOwnedByRestaurant
 * 
 * url: fakerestaurant.com/restaurants/{restaurantId}/reviews/{reviewId}
 */
reviewRouter.get('/restaurants/:restaurantid/reviews/:reviewid', [
    restaurantIdValdator,
    reviewIdValidator,
    requestValidator,
    RestaurantController.checkRestaurantExists,
    ReviewController.checkReviewExists,
    ensureRestaurantOwnsReview,
    ReviewController.getReviewById
]);

// ROUTES PROTETTE PER UTENTI AUTENTICATI

/**
 * Rappresenta la creazione di una review associata ad un ristorante.
 * Verifica che il restaurantId rappresenta un ristorante reale, altrimenti viene lanciato RestaurantDoentExistsError
 * 
 * url: fakerestaurant.com/restaurants/{restaurantId}/reviews
 */
reviewRouter.post('/restaurants/:restaurantid/reviews', [
    enforceAuthentication,
    restaurantIdValdator,
    createReviewValidators,
    requestValidator,
    RestaurantController.checkRestaurantExists,
    ReviewController.createNewReview,
]);

/**
 * Recupero paginato di tutte le review lasciate da un utente.
 * 
 * url: fakerestaurant.com/reviews?size=10&page=1
 */
reviewRouter.get('/reviews', [
    enforceAuthentication,
    paginationValidators,
    requestValidator,
    ReviewController.getUserReviews,
]);

/**
 * Rappresenta la rimozione
 * Verifica che il reviewId rappresenti una review reale, altrimenti viene lanciato un ReviewDoesntExistsError
 * Verifica che un utente elimini solo una propria recensione, altrimenti viene lanciato un UserDoesntOwnReviewError
 * 
 * url: fakerestaurant.com/reviews/{reviewId}
 */
reviewRouter.delete('/reviews/:reviewid', [
    enforceAuthentication,
    reviewIdValidator,
    requestValidator,
    ReviewController.checkReviewExists,
    ensureUserOwnsReview,
    ReviewController.deleteReview,
]);
