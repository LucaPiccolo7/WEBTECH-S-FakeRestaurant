import { Injectable, WritableSignal, signal, computed, inject, effect, afterNextRender, Component } from '@angular/core';
import { SearchRequest } from '../../interfaces/search-request';
/*
import { Router, TitleStrategy } from '@angular/router';
import { RestaurantService } from '../rest-backend/restaurant/restaurant.service';
import { Restaurant } from '../../interfaces/restaurant.interface';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
*/

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _defaultSize = 5;
  private _defaultPage = 1;
  private _searchRequest: WritableSignal<SearchRequest> = signal<SearchRequest>({
    size: this._defaultSize,
    page: this._defaultPage,
  });
  private _totalPagesNumber = signal(1);
  private _isSearchActive = signal(false);
  private _searchFooterRefresher = signal(0);
  private _showRestaurants = signal(false);
  private _showReviews = signal(false);
  private _isRestaurantPage = signal(false);

  size = computed(() => this._searchRequest().size);
  page = computed(() => this._searchRequest().page);
  name = computed(() => this._searchRequest()?.name);
  searchRequest = computed(() => this._searchRequest());
  totalPagesNumber = computed(() => this._totalPagesNumber());
  isSearchActive = computed(() => this._isSearchActive());
  showRestaurants = computed(() => this._showRestaurants());
  showReviews = computed(() => this._showReviews());
  searchFooterTracker = computed(() => this._searchFooterRefresher());
  isRestaurantPage  = computed(() => this._isRestaurantPage());

  setSize(size: string){
    this._searchRequest.update(searchRequest => ({...searchRequest, size: Number(size)}))
  }

  nextPage(){
    const nextPage = this.page() + 1;
    if(nextPage < this.totalPagesNumber()){
      this.setPage(String(nextPage));
    }
  }

  previousPage(){
    const previousPage = this.page() - 1;
    if(previousPage > 0){
      this.setPage(String(previousPage));
    }
  }

  setSearchFooterTracker(value: number){
    this._searchFooterRefresher.set(value);
  }

  setPage(page: string){
    this._searchRequest.update(searchRequest => ({...searchRequest, page: Number(page)}));
  }

  setName(name: string | undefined){
    this._searchRequest.update(searchRequest => {
      const newSearchParams = {...searchRequest};

      if(!name || name.trim().length === 0)
        delete newSearchParams.name;
      else
        newSearchParams.name = name;

      return newSearchParams;
    });
  }

  setSearchInactive(){
    this._isSearchActive.set(false);
  }

  setSearchActive(){
    this._isSearchActive.set(true);
  }

  setPagesNumber(num: number){
    this._totalPagesNumber.set(num);
  }

  setShowRestaurantsActive(){
    this._showRestaurants.set(true);
  }

  setShowRestaurantsInactive(){
    this._showRestaurants.set(false);
  }

  setShowReviewsActive(){
    this._showReviews.set(true);
  }

  setShowReviewsInactive(){
    this._showReviews.set(false);
  }
  setIsRestaurantPageActive(){
    this._isRestaurantPage.set(true);
  }

  setIsRestaurantPageInactive(){
    this._isRestaurantPage.set(false);
  }

  refresh(){
    this._searchRequest.set({size: this._defaultSize, page: this._defaultPage});
    this.setSearchInactive();
  }
}
