import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { SearchRequest } from '../../interfaces/search-request';
import { ResourceByIdRequest } from '../../interfaces/resource-by-id-request';
import { RestaurantsResponse, Restaurant, RestaurantRequest} from '../../interfaces/restaurant.interface';
import { IS_AUTH_ENABLED } from '../../_interceptors/auth/auth-interceptor';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  httpClient = inject(HttpClient);
  url = `http://localhost:3000/restaurants`;

  httpOptions: {headers: HttpHeaders, params?: HttpParams, context?: HttpContext} = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  //ROUTES PUBBLICHE
  getRestaurants(req: SearchRequest){
    this.refreshHttpOptions();
    let params = new HttpParams()
      .set('size', req.size)
      .set('page', req.page);

    if(req.name !== undefined && req.name !== null)
      params = params.set('name', req.name);

    this.httpOptions.params = params;
    this.httpOptions.context = new HttpContext().set(IS_AUTH_ENABLED, false);
    
    return this.httpClient.get<RestaurantsResponse>(this.url, this.httpOptions);
  }

  getRestaurantById(req: ResourceByIdRequest){
    this.refreshHttpOptions();
    const url = `${this.url}/${req.id}`;
    this.httpOptions.context = new HttpContext().set(IS_AUTH_ENABLED, false);
    return this.httpClient.get<Restaurant>(url, this.httpOptions);
  }

  //ROUTES PROTETTE PER UTENTI AUTENTICATI
  createNewRestaurant(req: FormData){
    this.refreshHttpOptions();
    return this.httpClient.post<RestaurantRequest>(this.url, req);
  }
  
  getUserRestaurants(req: SearchRequest){
    this.refreshHttpOptions();
    const params = new HttpParams()
      .set('size', req.size)
      .set('page', req.page);
    this.httpOptions.params = params;
    this.httpOptions.context = new HttpContext().set(IS_AUTH_ENABLED, true);
    return this.httpClient.get<RestaurantsResponse>(this.url, this.httpOptions);
  }

  deleteRestaurant(req: ResourceByIdRequest){
    const url = `${this.url}/${req.id}`;
    this.httpOptions.context = new HttpContext().set(IS_AUTH_ENABLED, true);
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
