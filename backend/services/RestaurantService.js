import { Restaurant } from "../models/Database.js";
import { Op } from "sequelize";
import { RestaurantDoesntExistsError} from '../errors/RestaurantDoesntExistsError.js'
import fs from 'fs';

export class RestaurantService {
	
	static async createRestaurant(req){
		const path = `/images/restaurants/${req.file.filename}`;
		return await Restaurant.create(
			{
				name: req.validatedData.name,
				description: req.validatedData.description,
				image: path,
				latitude: req.validatedData.latitude,
				longitude: req.validatedData.longitude,
				UserUsername: req.username,
			},
			{
				fields: ['name', 'description', 'image', 'latitude', 'longitude', 'UserUsername'],
			});
		}
		
		static async getRestaurantById(restaurantId){
			return await Restaurant.findByPk(restaurantId);
		}
		
		static async getRestaurants(req){
			//se è stato trovato un token jwt dall'autenticatore opzionale
			if(req.username){
				return await RestaurantService.getUserRestaurants(req);
			} else {
				return await RestaurantService.searchRestaurants(req);
			}
		}
		
		static async getUserRestaurants(req){
			const page = req.validatedData.page || 1
			const size = req.validatedData.size || 5
			const start = (page - 1) * size;
			return await Restaurant.findAndCountAll({
				attributes: ['id', 'name', 'description', 'image', 'latitude', 'longitude', 'UserUsername'],
				offset: start,
				limit: size,
				where: {
					UserUsername: req.username,
				}
			});
		}
		
		static async searchRestaurants(req){
			if(req.validatedData.name)
				return await RestaurantService.getRestaurantsByName(req);
			else
				return await RestaurantService.getAllRestaurants(req);
		}
		
		static async getAllRestaurants(req){
			const page = req.validatedData.page || 1
			const size = req.validatedData.size || 5
			const start = (page - 1) * size;
			return await Restaurant.findAndCountAll({
				attributes: ['id', 'name', 'description', 'image', 'latitude', 'longitude', 'UserUsername'],
				offset: start,
				limit: size,
			});
		}
		
		static async getRestaurantsByName(req){
			const page = req.validatedData.page || 1
			const size = req.validatedData.size || 10
			const start = (page - 1) * size;
			return await Restaurant.findAndCountAll({
				attributes: ['id', 'name', 'description', 'image', 'latitude', 'longitude', 'UserUsername'],
				offset: start,
				limit: size,
				where: {
					name: {
						[Op.substring]: req.validatedData.name,
					},
				}
			});
		}
		
		static async countRestaurantsByName(req){
			
		}
		
		static async countAllRestaurants(req){
			
		}
		
		static async countUserRestaurants(req){}
		
		static async checkRestaurantExists(restaurantId){
			const restaurant = await RestaurantService.getRestaurantById(restaurantId);
			if(!restaurant)
				throw new RestaurantDoesntExistsError(restaurantId);
			else
				return restaurant;
		}
		
		static async checkRestaurantOwnedByUser(username, restaurantId){
			return (await RestaurantService.getRestaurantById(restaurantId)).UserUsername === username;
		}
		
		static async deleteRestaurant(restaurantId){
			const restaurant = await RestaurantService.getRestaurantById(restaurantId);
			this.deleteImage(restaurant.image);
			await restaurant.destroy();
		}
		
		static deleteImage(image){
			const path = `./public${image}`;
			fs.unlink(path, (err) => {
				if (err) {
					console.error(`Error removing file: ${err}`);
					return;
				}
				console.log(`File ${path} has been successfully removed.`);
			});
		};
	}