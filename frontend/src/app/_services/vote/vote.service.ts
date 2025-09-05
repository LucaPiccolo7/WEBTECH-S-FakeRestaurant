import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { VoteRequest } from '../../interfaces/vote.interface';
import { ResourceByIdRequest } from '../../interfaces/resource-by-id-request';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  httpClient = inject(HttpClient);
  restaurantsUrl = 'http://localhost:3000/restaurants';
  httpOptions: {headers: HttpHeaders, params?: HttpParams} = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  createNewUpvote(restaurantId: ResourceByIdRequest, reviewId: ResourceByIdRequest){
    const type = 'upvote';
    const url = `${this.restaurantsUrl}/${restaurantId.id}/reviews/${reviewId.id}/votes?type=${type}`;
    return this.httpClient.post(url, {}, this.httpOptions);
  }

  createNewDownvote(restaurantId: ResourceByIdRequest, reviewId: ResourceByIdRequest){
    const type = 'downvote';
    const url = `${this.restaurantsUrl}/${restaurantId.id}/reviews/${reviewId.id}/votes?type=${type}`;
    return this.httpClient.post(url, {}, this.httpOptions);
  }  
}
