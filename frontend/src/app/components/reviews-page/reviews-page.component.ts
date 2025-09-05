import { Component, inject, OnDestroy, effect } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchRequest } from '../../interfaces/search-request';
import { AuthService } from '../../_services/auth/auth.service';
import { SearchService } from '../../_services/search/search.service';
import { SearchFooterComponent } from '../search-footer/search-footer.component';
import { ReviewService } from '../../_services/review/review.service';
import { Review } from '../../interfaces/review.interface';
import { ReviewsListComponent } from '../reviews-list/reviews-list.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reviews-page',
  standalone: true, 
  imports: [SearchFooterComponent, ReviewsListComponent],
  templateUrl: './reviews-page.component.html',
  styleUrl: './reviews-page.component.scss'
})
export class ReviewsPageComponent implements OnDestroy {

  authService = inject(AuthService);
  searchService = inject(SearchService);
  reviewService = inject(ReviewService);
  routerService = inject(Router);
  toastrService = inject(ToastrService);

  reviews: Review[] = [];
  totalReviews: number = 0
  searchRequest!: SearchRequest;
  showReviews!: boolean;
  totalPages!: number;
  page!: number;

  constructor(){
    this.searchService.setShowReviewsActive();
    effect(() => {
      this.searchRequest = this.searchService.searchRequest();
      this.fetchUserReviews();
      this.showReviews = this.searchService.showReviews();
    });
  }

  fetchUserReviews(){
    this.reviewService.getUserReviews(this.searchRequest).subscribe({
      next: (results) => {
        this.totalReviews = results.totalReviews;
        this.reviews = results.reviews;
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
