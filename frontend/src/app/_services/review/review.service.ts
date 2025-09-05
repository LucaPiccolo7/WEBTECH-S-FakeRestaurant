import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { SearchRequest } from '../../interfaces/search-request';
import { ReviewRequest, ReviewsResponse} from '../../interfaces/review.interface';
import { IS_AUTH_ENABLED } from '../../_interceptors/auth/auth-interceptor';
import { ResourceByIdRequest } from '../../interfaces/resource-by-id-request';
import { TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  
  httpClient = inject(HttpClient);
  userReviewsUrl = `http://localhost:3000/reviews`;
  restaurantReviewsUrl = 'http://localhost:3000/restaurants';
  httpOptions: {headers: HttpHeaders, params?: HttpParams, context?: HttpContext} = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  createNewReview(review: ReviewRequest, restaurantId: ResourceByIdRequest){
    const url = `${this.restaurantReviewsUrl}/${restaurantId.id}/reviews`;
    this.refreshHttpOptions();
    this.httpOptions.context = new HttpContext().set(IS_AUTH_ENABLED, true);
    return this.httpClient.post<ReviewRequest>(url, review, this.httpOptions);
  }

  getUserReviews(req: SearchRequest){
    this.refreshHttpOptions();
    const params = new HttpParams()
      .set('size', req.size)
      .set('page', req.page);
    this.httpOptions.params = params;

    this.httpOptions.context = new HttpContext().set(IS_AUTH_ENABLED, true);
    return this.httpClient.get<ReviewsResponse>(this.userReviewsUrl, this.httpOptions);
  }

  getRestaurantReviews(req: SearchRequest, restaurantId: ResourceByIdRequest){
    this.refreshHttpOptions();
    const url = `${this.restaurantReviewsUrl}/${restaurantId.id}/reviews`;
    const params = new HttpParams()
      .set('size', req.size)
      .set('page', req.page);
    this.httpOptions.params = params;
    this.httpOptions.context = new HttpContext().set(IS_AUTH_ENABLED, false);
    return this.httpClient.get<ReviewsResponse>(url, this.httpOptions);
  }

  deleteReview(request: ResourceByIdRequest){
    this.refreshHttpOptions();
    const url = `${this.userReviewsUrl}/${request.id}`;
    return this.httpClient.delete(url, this.httpOptions);
  }

  refreshHttpOptions(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
