import express from 'express';

import { restaurantIdValdator } from '../middlewares/validators/restaurantValidators.js';
import { reviewIdValidator } from '../middlewares/validators/reviewValidators.js';
import { voteOptionalValidators, voteStrictValidators } from '../middlewares/validators/voteValidators.js'

import { enforceAuthentication } from '../middlewares/enforceAuthentication.js';
import { requestValidator } from '../middlewares/requestValidator.js';
import { ensureRestaurantOwnsReview } from '../middlewares/enforceAuthorization.js';

import { RestaurantController } from '../controllers/RestaurantController.js';
import { ReviewController } from '../controllers/ReviewController.js';
import { VoteController } from '../controllers/VoteController.js';

export const voteRouter = express.Router();

// ROUTES PUBBLICHE

/**
 * Recupera tutti i voti (downvotes ed upvotes) relativi ad una recentsione
 * Verifica che il valore associato al query parameter 'type' sia 'upvote' oppure 'downvote', altrimenti recupera tutti i voti
 * Verifica che il restaurantId rappresenta un ristorante reale, altrimenti viene lanciato RestaurantDoentExistsError
 * Verifica che il reviewId rappresenti una review reale, altrimenti viene lanciato un ReviewDoesntExistsError
 * Verifica che il reviewId rappresenti una recensione pubblicata per il ristorante restaurantId, altrimenti viene lanciato un ReviewDoesntOwnedByRestaurant
 * 
 * url: fakerestaurant.com/restaurants/{restaurantId}/reviews/{reviewId}/downvote
 */
voteRouter.get('/restaurants/:restaurantid/reviews/:reviewid/votes', [
    restaurantIdValdator,
    reviewIdValidator,
    voteOptionalValidators,
    requestValidator,
    VoteController.checkVoteType,
    RestaurantController.checkRestaurantExists,
    ReviewController.checkReviewExists,
    ensureRestaurantOwnsReview,
    VoteController.getReviewVotes,
]);

// ROUTES PROTETTE PER UTENTI AUTENTICATI

/**
 * Rappresenta l'inserimento di un voto (downvote o upvote) ad una recensione di un ristorante
 * Verifica che il valore associato al query parameter 'type' sia 'upvote' oppure 'downvote'
 * Verifica che il restaurantId rappresenta un ristorante reale, altrimenti viene lanciato RestaurantDoentExistsError
 * Verifica che il reviewId rappresenti una review reale, altrimenti viene lanciato un ReviewDoesntExistsError
 * Verifica che il reviewId rappresenti una recensione pubblicata per il ristorante restaurantId, altrimenti viene lanciato un ReviewDoesntOwnedByRestaurant
 * 
 * url: fakerestaurant.com/restaurants/{restaurantId}/reviews/{reviewId}/downvote
 */
voteRouter.post('/restaurants/:restaurantid/reviews/:reviewid/votes', [
    enforceAuthentication,
    restaurantIdValdator,
    reviewIdValidator,
    voteStrictValidators,
    requestValidator,
    VoteController.checkVoteType,
    RestaurantController.checkRestaurantExists,
    ReviewController.checkReviewExists,
    ensureRestaurantOwnsReview,
    VoteController.addVote,
]);

/**
 * Rappresenta l'eliminazione di un voto (upvote o downvote) ad una recensione di un ristorante
 * Verifica che il valore associato al query parameter 'type' sia 'upvote' oppure 'downvote'
 * Verifica che il restaurantId rappresenta un ristorante reale, altrimenti viene lanciato RestaurantDoentExistsError
 * Verifica che il reviewId rappresenti una review reale, altrimenti viene lanciato un ReviewDoesntExistsError
 * Verifica che il reviewId rappresenti una recensione pubblicata per il ristorante restaurantId, altrimenti viene lanciato un ReviewDoesntOwnedByRestaurant
 * 
 * url: fakerestaurant.com/restaurants/{restaurantId}/reviews/{reviewId}/downvote
 */
voteRouter.delete('/restaurants/:restaurantid/reviews/:reviewid/votes', [
    enforceAuthentication,
    restaurantIdValdator,
    reviewIdValidator,
    voteStrictValidators,
    requestValidator,
    VoteController.checkVoteType,
    RestaurantController.checkRestaurantExists,
    ReviewController.checkReviewExists,
    ensureRestaurantOwnsReview,
    VoteController.removeVote,
]);