import { Component, effect, inject, input } from '@angular/core';
import { SearchService } from '../../_services/search/search.service';
import { SearchRequest } from '../../interfaces/search-request';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-footer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-footer.component.html',
  styleUrl: './search-footer.component.scss'
})
export class SearchFooterComponent {

  searchService = inject(SearchService);
  routerService = inject(Router);
  searchRequest!: SearchRequest;
  showReviews!: boolean;
  showRestaurants!: boolean;
  page!: number;
  goToPage!: number;
  totalPages!: number;
  
  maxPagesVisible = 5;
  displayedPages: number[] = [];
  isRestaurantPage = input(false);
  restaurantId = input<number | undefined>(undefined);

  constructor(){
    effect(() => {
      this.showRestaurants = this.searchService.showRestaurants();
      this.showReviews = this.searchService.showReviews();
      this.searchRequest = this.searchService.searchRequest();
      this.page = this.searchService.page();
      this.totalPages = this.searchService.totalPagesNumber();
      this.displayedPages = this.getVisiblePages(this.totalPages, this.page, this.maxPagesVisible);
    });
  }

  getVisiblePages(totalPages: number, current: number, maxVisible = 5): number[] {

    if (totalPages === 0) return [];

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisible / 2);
    let start = current - half;
    let end = start + maxVisible - 1;

    if (start < 1) {
      start = 1;
      end = start + maxVisible - 1;
    }
    
    if (end > totalPages) {
      end = totalPages;
      start = end - maxVisible + 1;
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++)
      pages.push(i);

    return pages;
}

  onPrev(event: Event) {
    event.preventDefault();
    if (this.page > 1) {
      if (this.isRestaurantPage() && this.restaurantId())
        this.handleRestaurantPageClick(this.page - 1, this.restaurantId());
      else if(this.showRestaurants)
        this.handleRestaurantClick(this.page - 1);
      else if(this.showReviews)
        this.handleReviewClick(this.page - 1);
    }
  }

  onNext(event: Event) {
    event.preventDefault();
    if (this.page < this.totalPages) {
      if (this.isRestaurantPage() && this.restaurantId())
        this.handleRestaurantPageClick(this.page + 1, this.restaurantId());
      else if(this.showRestaurants)
        this.handleRestaurantClick(this.page + 1);
      else if(this.showReviews)
        this.handleReviewClick(this.page + 1);
    }
  }

  handleClick(newPage: number){
    if (this.isRestaurantPage() && this.restaurantId())
      this.handleRestaurantPageClick(newPage, this.restaurantId());
    else if(this.showRestaurants)
      this.handleRestaurantClick(newPage);
    else if (this.showReviews)
      this.handleReviewClick(newPage);
  }

  handleReviewClick(newPage: number){
    this.searchService.setPage(String(newPage));
    const params: Record<string, string> = {
      size: String(this.searchService.size()),
      page: String(this.searchService.page()),
    };

    this.routerService.navigate(['/reviews'], {queryParams: params});
  }

  handleRestaurantClick(newPage: number){
    this.searchService.setPage(String(newPage));
    const params: Record<string, string> = {
      size: String(this.searchService.size()),
      page: String(this.searchService.page()),
    };
    if(this.searchService.name())
      params['name'] = String(this.searchService.name())
    
    this.routerService.navigate(['/restaurants'], {queryParams: params});
  }

  handleRestaurantPageClick(newPage: number, restaurantId: number | undefined){
    this.searchService.setPage(String(newPage));
    const params: Record<string, string> = {
      size: String(this.searchService.size()),
      page: String(this.searchService.page()),
    };

    console.log(restaurantId);
    this.routerService.navigate(['/restaurants', restaurantId, 'reviews'], { queryParams: params });
  }
}
