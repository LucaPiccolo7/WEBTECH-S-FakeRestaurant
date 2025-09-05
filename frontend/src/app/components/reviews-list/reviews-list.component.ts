import { Component, input, inject} from '@angular/core';
import { Review } from '../../interfaces/review.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from '../../_services/search/search.service';
import { ReviewService } from '../../_services/review/review.service';
import { VoteService } from '../../_services/vote/vote.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reviews-list',
  imports: [],
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.scss'
})
export class ReviewsListComponent {

  reviews = input<Review[]>([]);
  isRestaurantPage = input<boolean>(false);
  routerService = inject(Router);
  reviewService = inject(ReviewService);
  toastrService = inject(ToastrService);
  searchService = inject(SearchService);
  voteService = inject(VoteService);

  onClick(restaurantId: number){
    this.routerService.navigate(['/restaurants', restaurantId],);
  }

  onUpvoteClick(review: Review){
    this.voteService.createNewUpvote({id: review.RestaurantId}, {id: review.id}).subscribe({
      error: (response: HttpErrorResponse) => {
        if(response.error.status == 401){
          this.toastrService.warning(response.error.message, "Token invalid");
          this.routerService.navigateByUrl("/login");
        } else if (response.error.status == 404){
          this.toastrService.error(response.error.message, "Denied");
        } else if (response.error.status == 500){
          this.toastrService.error("Please, contact an admin", "Internal error");
          this.routerService.navigateByUrl("/");
        }
      },
      complete: () => {        
        this.toastrService.success('Upvote created', 'Success');
        this.searchService.refresh(); //aggiorna la lista di review
      }
    });
  }

  onDownvoteClick(review: Review){
    this.voteService.createNewDownvote({id: review.RestaurantId}, {id: review.id}).subscribe({
      error: (response: HttpErrorResponse) => {
        if(response.error.status == 401){
          this.toastrService.warning(response.error.message, "Token invalid");
          this.routerService.navigateByUrl("/login");
        } else if (response.error.status == 404){
          this.toastrService.error(response.error.message, "Denied");
        } else if (response.error.status == 500){
          this.toastrService.error("Please, contact an admin", "Internal error");
          this.routerService.navigateByUrl("/");
        }
      },
      complete: () => {
        this.toastrService.success('Downvote created', 'Success');
        this.searchService.refresh(); //aggiorna la lista di review
      }
    });
  }

  onDelete(reviewId: number){
    this.reviewService.deleteReview({id: reviewId}).subscribe({
      error: (response: HttpErrorResponse) => {
        if(response.error.status == 401){
          this.toastrService.warning(response.error.message, "Token invalid");
          this.routerService.navigateByUrl("/login");
        } else if (response.error.status == 404){
          this.toastrService.error(response.error.message, "Denied");
        } else if (response.error.status == 500){
          this.toastrService.error("Please, contact an admin", "Internal error");
          this.routerService.navigateByUrl("/");
        }
      },
      complete: () => {
        this.toastrService.success("Review removed", "Success");
        this.searchService.refresh();
      },
    });
  }

}
