import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout.component',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {
  
  authService = inject(AuthService);
  toastrService = inject(ToastrService);
  routerService = inject(Router);

  ngOnInit() {
      this.toastrService.success(`Come back soon, ${this.authService.username()}!`, "Success");
      this.authService.logout();
      this.routerService.navigateByUrl("/");
  }
}
