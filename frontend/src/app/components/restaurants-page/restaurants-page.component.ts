import { Component, inject, OnDestroy, effect, computed, signal, Signal } from '@angular/core';
import { RestaurantService } from '../../_services/restaurant/restaurant.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from '../../interfaces/restaurant.interface';
import { SearchRequest } from '../../interfaces/search-request';
import { AuthService } from '../../_services/auth/auth.service';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { SearchService } from '../../_services/search/search.service';
import { SearchFooterComponent } from '../search-footer/search-footer.component';
import { RestaurantsListComponent } from "../restaurants-list/restaurants-list.component";
import { PublishRestaurantPageComponent } from "../publish-restaurant-page/publish-restaurant-page.component";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-restaurants-page',
  standalone: true, 
  imports: [SearchBarComponent, SearchFooterComponent, RestaurantsListComponent, PublishRestaurantPageComponent],
  templateUrl: './restaurants-page.component.html',
  styleUrl: './restaurants-page.component.scss'
})
export class RestaurantsPageComponent implements OnDestroy {

  authService = inject(AuthService);
  searchService = inject(SearchService);
  restaurantService = inject(RestaurantService);
  routerService = inject(Router);
  toastrService = inject(ToastrService);

  restaurants: Restaurant[] = [];
  searchRequest!: SearchRequest;
  totalRestaurants: number = 0
  isAuthenticated!: boolean;
  isSearchActive!: boolean;
  showRestaurants!: boolean;
  totalPages!: number;
  page!: number;

  private _showPublishRestaurantPage = signal(false);
  showPublishRestaurantPage!: Signal<boolean>;

  constructor(){
    this.searchService.setShowRestaurantsActive();
    effect(() => {
      this.isAuthenticated = this.authService.isAuthenticated();
      this.isSearchActive = this.searchService.isSearchActive();
      this.searchRequest = this.searchService.searchRequest();
      this.fetchData(this.isAuthenticated, this.isSearchActive);
      this._showPublishRestaurantPage.set(false);
      this.showPublishRestaurantPage = computed(() => this._showPublishRestaurantPage());
      this.showRestaurants = this.searchService.showRestaurants();
    });
  }

  fetchData(isAuthenticated: boolean, isSearchActive: boolean){
    if(isAuthenticated && !isSearchActive)
      this.fetchUserRestaurants();
    else if (isSearchActive)
      this.fetchRestaurants();
  }

  fetchUserRestaurants(){
    this.restaurantService.getUserRestaurants(this.searchRequest).subscribe({
      next: (results) => {
        this.totalRestaurants = results.totalRestaurants;
        this.restaurants = results.restaurants;
        this.initPages();
      },
      error: (response: HttpErrorResponse) => {
        if(response.error.status == 401){
          this.toastrService.warning(response.error.message, "Token invalid");
          this.routerService.navigateByUrl("/login");
        } else if (response.error.status == 500){
          this.toastrService.error("Please, contact an admin", "Internal error");
          this.routerService.navigateByUrl("/");
        }
      }
    });
  }

  fetchRestaurants(){
    this.restaurantService.getRestaurants(this.searchRequest).subscribe({
      next: (results) => {
        this.totalRestaurants = results.totalRestaurants;
        this.restaurants = results.restaurants;
        this.initPages();
      },
      error: (response: HttpErrorResponse) => {
        if (response.error.status == 500){
          this.toastrService.error("Please, contact an admin", "Internal error");
          this.routerService.navigateByUrl("/");
        }
      },
    })
  }

  initPages(){
    this.searchService.setPagesNumber(this.getTotalPagesNumber());
    this.totalPages = this.searchService.totalPagesNumber();
    this.page = this.searchService.page();
  }

  getTotalPagesNumber(){
    return Math.ceil(this.totalRestaurants/this.searchRequest.size);
  }

  publishRestaurant(){
    this._showPublishRestaurantPage.set(true);
  }
  
  ngOnDestroy() {
    this.searchService.setShowRestaurantsInactive();
    this.searchService.refresh();
  }
}
