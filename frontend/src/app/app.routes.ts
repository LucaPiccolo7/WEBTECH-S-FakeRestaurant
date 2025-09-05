import { Routes } from '@angular/router';
import { HomePageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RestaurantsPageComponent } from './components/restaurants-page/restaurants-page.component';
import { authGuard } from './_guards/auth/auth.guard';
import { ReviewsPageComponent } from './components/reviews-page/reviews-page.component';
import { RestaurantPageComponent } from './components/restaurant-page/restaurant-page.component';
import { LogoutComponent } from './components/logout/logout.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomePageComponent,
  },
  {
    path: 'register',
    title: 'Sign-up',
    component: RegisterComponent,
  },
  {
    path: 'login',
    title: 'Sign-in',
    component: LoginComponent,
  },
  {
    path: 'logout',
    title: 'Logout',
    component: LogoutComponent,
  },
  {
    path: 'restaurants/:restaurantid',
    title: 'Restaurant',
    component: RestaurantPageComponent,
  },
  {
    path: 'restaurants/:restaurantid/reviews',
    title: 'Restaurant',
    component: RestaurantPageComponent,
  },
  {
    path: 'restaurants',
    title: 'Restaurants',
    component: RestaurantsPageComponent,
  },
  {
    path: 'reviews',
    title: 'Reviews',
    component: ReviewsPageComponent,
    canActivate: [authGuard],
  }
];
