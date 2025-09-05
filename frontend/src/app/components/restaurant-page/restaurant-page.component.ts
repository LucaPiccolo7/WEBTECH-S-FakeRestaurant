import { Component, inject, OnDestroy, signal, effect} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Restaurant } from '../../interfaces/restaurant.interface';
import { Review } from '../../interfaces/review.interface';
import { MapComponent } from "../map/map.component";
import { ReviewsListComponent } from "../reviews-list/reviews-list.component";
import { RestaurantService } from '../../_services/restaurant/restaurant.service';
import { ReviewService } from '../../_services/review/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from '../../_services/search/search.service';
import { SearchRequest } from '../../interfaces/search-request';
import { SearchFooterComponent } from '../search-footer/search-footer.component';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-restaurant-page',
  imports: [MapComponent, ReviewsListComponent, SearchFooterComponent, ReactiveFormsModule],
  templateUrl: './restaurant-page.component.html',
  styleUrl: './restaurant-page.component.scss'
})
export class RestaurantPageComponent implements OnDestroy {

  restaurantService = inject(RestaurantService);
  reviewService = inject(ReviewService);
  searchService = inject(SearchService);
  authService = inject(AuthService);
  activatedRouteService = inject(ActivatedRoute);
  toastrService = inject(ToastrService);
  routerService = inject(Router);

  isRestaurantPage = true;
  restaurantId = signal(0);
  reviews: Review[] = [];
  totalReviews = 0;
  restaurant!: Restaurant;
  showReviews!: boolean;
  searchRequest!: SearchRequest;
  totalPages!: number;
  page!: number;

  submitted = false;
  reviewForm = new FormGroup({
    message: new FormControl<string | null>('', [Validators.required, Validators.minLength(1) ,Validators.maxLength(150)]),
  });

  get message(){
    return this.reviewForm.get('message');
  }

  constructor(){
    this.getRestaurantId();
    this.searchService.setShowReviewsActive();
    this.fetchRestaurant();
    effect(() => {
      this.showReviews = this.searchService.showReviews();
      this.searchRequest = this.searchService.searchRequest();
      this.fetchReviews();
    });
  }

  
  getRestaurantId(){
    this.activatedRouteService.params.subscribe((params) => {
      this.restaurantId.set(params['restaurantid']);
    });
  }

  fetchRestaurant(){
    this.restaurantService.getRestaurantById({id: this.restaurantId()}).subscribe({
      next: (restaurant) => {
        this.restaurant = restaurant;
      },
      error: (response: HttpErrorResponse) => {
        if(response.error.status == 401){
          this.toastrService.warning(response.error.message, "Token invalid");
          this.routerService.navigateByUrl("/login");
        } else if(response.error.status == 404){
          this.toastrService.error(response.error.message, "Denied");
          this.routerService.navigateByUrl("/");
        } else if (response.error.status == 500){
          this.toastrService.error("Please, contact an admin", "Internal error");
          this.routerService.navigateByUrl("/");
        }
      },
    });
  }

  fetchReviews(){
    this.reviewService.getRestaurantReviews(this.searchRequest, {id: this.restaurantId()}).subscribe({
      next: (result) => {
        this.totalReviews = result.totalReviews;
        this.reviews = result.reviews;
        this.initPages();
      },
      error: (response: HttpErrorResponse) => {
        if(response.error.status == 401){
          this.toastrService.warning(response.error.message, "Token invalid");
          this.routerService.navigateByUrl("/login");
        } else if(response.error.status === 404){
          this.toastrService.error(response.error.message, "Denied");
          this.routerService.navigateByUrl("/");
        } else if (response.error.status == 500){
          this.toastrService.error("Please, contact an admin", "Internal error");
          this.routerService.navigateByUrl("/");
        }
      },
    });
  }

  onPublish(){
    this.submitted = true;
    if(!this.reviewForm.invalid){
      this.reviewService.createNewReview({message: this.message?.value as string}, {id: this.restaurantId()}).subscribe({
        error: (response: HttpErrorResponse) => {
          if(response.error.status == 401){
            this.toastrService.warning(response.error.message, "Token invalid");
            this.routerService.navigateByUrl("/login");
          } else if (response.error.status == 500){
            this.toastrService.error("Please, contact an admin", "Internal error");
            this.routerService.navigateByUrl("/");
          }
        },
        complete: () => {
          this.toastrService.success('Review created', "Created");
          this.submitted = false;
          this.reviewForm.setValue({message: ""});
          this.fetchReviews();
          this.reviewForm.value.message = '';
        }
      });
    }
  }

  getImageUrl(path?: string) {
    return `${environment.backendUrl}${path}`;
  }

  initPages(){
    this.searchService.setPagesNumber(this.getTotalPagesNumber());
    this.totalPages = this.searchService.totalPagesNumber();
    this.page = this.searchService.page();
  }

  getTotalPagesNumber(){
    return Math.ceil(this.totalReviews/this.searchRequest.size);
  }

  ngOnDestroy() {
    this.searchService.setShowReviewsInactive();
    this.searchService.refresh();
  }
}
