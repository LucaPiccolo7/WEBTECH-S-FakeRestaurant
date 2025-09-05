import { Component, inject, effect } from '@angular/core';
import { MenuToggleComponent } from '../buttons/menu-toggle/menu-toggle.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../_services/auth/auth.service';
import { DarkModeToggleComponent } from '../buttons/dark-mode-toggle/dark-mode-toggle.component';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from '../../_services/search/search.service';

@Component({
  selector: 'app-navbar',
  imports: [
    DarkModeToggleComponent,
    MenuToggleComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

  authService = inject(AuthService);
  searchService = inject(SearchService);
  routerService = inject(Router);
  toastrService = inject(ToastrService);

  auth!: boolean;
  isMenuOpen: boolean = false;
  isAuthenticated!: boolean;
  username!: string | null;

  constructor(){
    effect(() => {
      this.isAuthenticated = this.authService.isAuthenticated();
      this.username = this.authService.username();
    });
  }

  openMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  handleRestaurants(){
    this.closeMenu();
    if(!this.isAuthenticated){
      this.toastrService.warning("Please, login to access this feature", "Login required");
      this.routerService.navigateByUrl("/login");
    } else {
      this.searchService.refresh();
      this.routerService.navigateByUrl("/restaurants");
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
