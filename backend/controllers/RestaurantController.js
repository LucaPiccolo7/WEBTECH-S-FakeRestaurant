import { RestaurantService } from "../services/RestaurantService.js";

export class RestaurantController {

    static async createNewRestaurant(req, res, next){
        RestaurantService.createRestaurant(req)
        .then((restaurant) => {
            res.status(201);
            res.json(restaurant);
        }).catch((error) => {
            next(error);
        });
    }

    static async getRestaurantById(req, res, next){
        RestaurantService.getRestaurantById(req.validatedData.restaurantid)
        .then((restaurant) => {
            res.status(200);
            res.json(restaurant);
        })
        .catch((error) => {
            next(error);
        });
    }

    static async getRestaurants(req, res, next){
        RestaurantService.getRestaurants(req)
        .then((results) => {
            res.status(200);
            res.json({
                totalRestaurants: results.count,
                restaurants: results.rows,
            });
        })
        .catch((error) => {
            next(error);
        });
    }
    
    static async deleteRestaurant(req, res, next){
        RestaurantService.deleteRestaurant(req.validatedData.restaurantid)
        .then(() => {
            res.status(204);
            res.end();
        })
        .catch((error) => {
            next(error);
        })
    }

    static async checkRestaurantExists(req, res, next){
        RestaurantService.checkRestaurantExists(req.validatedData.restaurantid)
        .then(() => {
            next();
        })
        .catch((error) => {
            next(error);
        })
    }
}