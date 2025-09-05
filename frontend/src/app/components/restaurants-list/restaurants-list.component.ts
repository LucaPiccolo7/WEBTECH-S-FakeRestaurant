import { Component, inject, input } from '@angular/core';
import { Restaurant } from '../../interfaces/restaurant.interface';
import { Router } from '@angular/router';
import { RestaurantService } from '../../_services/restaurant/restaurant.service';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from '../../_services/search/search.service';
import { FormsModule } from '@angular/forms';
import { ResourceByIdRequest } from '../../interfaces/resource-by-id-request';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-restaurants-list',
  imports: [FormsModule],
  templateUrl: './restaurants-list.component.html',
  styleUrl: './restaurants-list.component.scss'
})
export class RestaurantsListComponent {

  restaurants = input<Restaurant[]>([]);
  isSerchActive = input<boolean>();
  routerService = inject(Router);
  restaurantService = inject(RestaurantService);
  toastrService = inject(ToastrService);
  searchService = inject(SearchService);

  getImageUrl(path?: string) {
    return `${environment.backendUrl}${path}`;
  }

  onClick(restaurantId: number){
    this.routerService.navigate(['/restaurants', restaurantId],);
  }

  onDelete(restaurantId: number){
    const resourceId: ResourceByIdRequest = {id: restaurantId};
    this.restaurantService.deleteRestaurant(resourceId).subscribe({
      error: (response: HttpErrorResponse) => {
        if(response.error.status == 401){
          this.toastrService.warning(response.error.message, "Token invalid");
          this.routerService.navigateByUrl("/login");
        } else if (response.error.status == 404){
          this.toastrService.error(response.error.message, "Denied");
        }
      },
      complete: () => {
        this.toastrService.success("Restaurant removed", "Success");
        this.searchService.refresh();
      },
    });
  }
}
