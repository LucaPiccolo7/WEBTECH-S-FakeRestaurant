import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

import { paginationValidators } from '../middlewares/validators/paginationValidators.js';
import { createRestaurantValidators, restaurantIdValdator, restaurantSearchValidator } from '../middlewares/validators/restaurantValidators.js';

import { enforceAuthentication } from '../middlewares/enforceAuthentication.js';
import { optionalAuthentication } from '../middlewares/optionalAuthentication.js';
import { imageValidator } from '../middlewares/validators/imageValidator.js';
import { ensureUserOwnsRestaurant } from '../middlewares/enforceAuthorization.js';
import { requestValidator } from '../middlewares/requestValidator.js';

import { RestaurantController } from '../controllers/RestaurantController.js'

export const restaurantRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/restaurants');
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.')[1]; 
    cb(null, `${uuidv4()}.${extension}`);
  },
});
const upload = multer({storage: storage, limits: {fileSize: 1100000}});

// ROUTES PUBBLICHE

/**
 * Se un utente è autenticato, recupera una lista paginata di tutti i ristoranti pubblicati dall'utente 
 * 
 * Se un utente non è autenticato, recupera una lista paginata di tutti i ristoranti che contengono il nome specificato nel titolo. Se 
 * non è presente il query parameter "name", vengono recuperati tutti i ristoranti pubblicati.
 * 
 * url(Autenticato): fakerestaurant.com/restaurants/size=10&page=1
 * url(Non autenticato con nome): fakerestaurant.com/restaurants?name=Ristorante&size=:size&page=:page
 * url(Non autenticato senza nome): fakerestaurant.com/restaurants?size=:size&page=:page
 */
restaurantRouter.get('/restaurants', [
  optionalAuthentication,
  restaurantSearchValidator,
  paginationValidators,
  requestValidator,
  RestaurantController.getRestaurants,
])

/**
 * Recupera il ristorante con l'id specificato.
 * Verifica che il restaurantId rappresenta un ristorante reale, altrimenti viene lanciato RestaurantDoentExistsError
 * 
 * url: fakerestaurant.com/restaurants/{restaurantId}
 */
restaurantRouter.get('/restaurants/:restaurantid', [
  restaurantIdValdator,
  requestValidator,
  RestaurantController.checkRestaurantExists,
  RestaurantController.getRestaurantById
]);

// ROUTES PROTETTE PER UTENTI AUTENTICATI

/**
 * Rappresenta la pubblicazione di un nuovo ristorante da parte di un utente autenticato.
 * Verifica che sia specificata un immagine e che l'estensione sia coerente con il formato dell'immagine
 * 
 * url: fakerestaurant.com/restaurants
 */
restaurantRouter.post('/restaurants', [
  enforceAuthentication,
  upload.single('image'),
  imageValidator,
  createRestaurantValidators,
  requestValidator,
  RestaurantController.createNewRestaurant,
]);

/**
 * Permette l'eliminazione di un ristorante da parte di un utente
 * Verifica che il restaurantId rappresenta un ristorante reale, altrimenti viene lanciato RestaurantDoentExistsError
 * Controlla che l'utente abbia pubblicato in precedenza il ristorante da eliminare, altrimenti lancia UserDoesntOwnsRestaurantError
 * 
 * url: fakerestaurant.com/restaurant/{restaurantId}
 */
restaurantRouter.delete('/restaurants/:restaurantid', [
  enforceAuthentication,
  restaurantIdValdator,
  requestValidator,
  RestaurantController.checkRestaurantExists,
  ensureUserOwnsRestaurant,
  RestaurantController.deleteRestaurant,
]);