export interface RestaurantRequest {
    name: string,
    description: string,
    image: string,
    latitude: number,
    longitude: number,
}

export interface Restaurant {
    id: number,
    name: string,
    description: string,
    image: string,
    latitude: number,
    longitude: number,
}

export interface RestaurantsResponse {
    totalRestaurants: number,
    restaurants: Restaurant[],
}