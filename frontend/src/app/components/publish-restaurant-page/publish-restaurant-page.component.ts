import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MapComponent } from "../map/map.component";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SearchService } from '../../_services/search/search.service';
import { RestaurantService } from '../../_services/restaurant/restaurant.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-publish-restaurant-page',
  imports: [ReactiveFormsModule, MapComponent],
  templateUrl: './publish-restaurant-page.component.html',
  styleUrl: './publish-restaurant-page.component.scss'
})
export class PublishRestaurantPageComponent {
  
  toastrService = inject(ToastrService);
  routerService = inject(Router);
  searchService = inject(SearchService);
  restaurantService = inject(RestaurantService);
  
  submitted = false;
  fileName!: string;
  restaurantForm = new FormGroup({
    name: new FormControl<string | null>('', [Validators.required, Validators.minLength(1) ,Validators.maxLength(50)]),
    description: new FormControl<string | null>('', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]),
    image: new FormControl<File | null>(null, [Validators.required, this.forbiddenImageFormatValiddator(), this.forbiddenImageSizeValidator()]),
    latitude: new FormControl<number | null>(null, [Validators.required, Validators.min(-90), Validators.max(90)]),
    longitude: new FormControl<number | null>(null, [Validators.required, Validators.min(-180), Validators.max(180)]),
  });

  get name(){
    return this.restaurantForm.get('name');
  }

  get description(){
    return this.restaurantForm.get('description');
  }

  get image(){
    return this.restaurantForm.get('image');
  }

  get latitude(){
    return this.restaurantForm.get('latitude');
  }

  get longitude(){
    return this.restaurantForm.get('longitude');
  }
  
  onPublish(){
    this.submitted = true;
    if (!this.restaurantForm.invalid){
      const formData = new FormData();
      formData.append('name', this.name?.value as string);
      formData.append('description', this.description?.value as string);
      formData.append('image', this.image?.value as File);
      formData.append('latitude', (this.latitude?.value as number).toString());
      formData.append('longitude', (this.longitude?.value as number).toString());
  
      this.restaurantService.createNewRestaurant(formData).subscribe({
        error: (response: HttpErrorResponse) => {
          if(response.error.status == 400){
            this.toastrService.error(response.error.message, "Denied");
          } else if(response.error.status == 401){
            this.toastrService.warning(response.error.message, "Token invalid");
            this.routerService.navigateByUrl("/login");
          } else if (response.error.status == 415){
            this.toastrService.error(response.error.message, "Denied");
          } else if (response.error.status == 500){
            this.toastrService.error("Please, contact an admin", "Internal error");
            this.routerService.navigateByUrl("/");
          }
        },
        complete: () => {
          this.searchService.refresh();
          this.routerService.navigateByUrl('/restaurants');
          this.toastrService.success('Restaurant created', 'Success');
        }
      });
    }
  }

  forbiddenImageSizeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value as File | null;
      let forbidden = false;

      //1.1MB
      if(!file?.size || file.size > 1.1*1024*1024)
        forbidden = true;

      return forbidden ? {'forbiddenImageSize': {value: file?.size}} : null;
    };
  }

  forbiddenImageFormatValiddator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value as File | null;
      let forbidden = false;

      if(!file?.type || (file.type != 'image/jpeg' && file.type != 'image/jpg' && file.type != 'image/png'))
        forbidden = true;

      return forbidden ? {'forbiddenImageFormat': {value: file?.type}} : null;
    };
  }

  onFileChange(event: any){
    const file = event.target.files[0];
    this.fileName = file.name;
    this.restaurantForm.patchValue({image: file});
  }
  
  updateLatitude(latitude: number){
    this.restaurantForm.patchValue({latitude: latitude});
  }
  
  updateLongitude(longitude: number){
    this.restaurantForm.patchValue({longitude: longitude});
  }
  
  onDiscard(){
    this.searchService.refresh();
    this.routerService.navigate(['/restaurants']);
    this.toastrService.error("Restaurant creation canceled!", "Discarded");
  }
}
