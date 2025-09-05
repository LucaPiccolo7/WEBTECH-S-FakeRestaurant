export interface ReviewRequest {
    message: string,
}

export interface Review {
    id: number,
    message: string,
    popularity: number,
    upvotes: number,
    downvotes: number,
    RestaurantId: number,
    UserUsername: string,
}

export interface ReviewsResponse {
    totalReviews: number,
    reviews: Review[],
}