import { UserDoesntOwnRestaurantError } from "../errors/UserDoesntOwnRestaurantError.js";
import { UserDoesntOwnReviewError } from '../errors/UserDoesntOwnReviewError.js';
import { RestaurantService } from "../services/RestaurantService.js";
import { ReviewService } from "../services/ReviewService.js";
import { RestaurantDoesntOwnReviewError } from "../errors/RestaurantDoesntOwnReviewError.js";


export async function ensureUserOwnsRestaurant(req, res, next){
  const owned = await RestaurantService.checkRestaurantOwnedByUser(req.username, req.validatedData.restaurantid);
  if(owned)
    next();
  else
    throw new UserDoesntOwnRestaurantError(req.username, req.validatedData.restaurantid);
}

export async function ensureUserOwnsReview(req, res, next){
  const owned = await ReviewService.checkReviewOwnedByUser(req.username, req.validatedData.reviewid);
  if(owned)
    next();
  else
    throw new UserDoesntOwnReviewError(req.username, req.validatedData.reviewid);
}

export async function ensureRestaurantOwnsReview(req, res, next){
  const owned = await ReviewService.checkReviewOwnedByRestaurant(req.validatedData.restaurantid, req.validatedData.reviewid);
  if(owned)
    next();
  else
    throw new RestaurantDoesntOwnReviewError(req.validatedData.restaurantid, req.validatedData.reviewid);
}