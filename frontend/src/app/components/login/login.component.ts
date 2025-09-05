import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_services/user/user.service';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../_services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  userService = inject(UserService);
  toastrService = inject(ToastrService);
  authService = inject(AuthService);
  router = inject(Router);

  submitted = false;
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
  });

  get username(){
    return this.userForm.get('username');
  }

  get password(){
    return this.userForm.get('password');
  }


  onSubmit(){
    this.submitted = true;
    if(!this.userForm.invalid){
      this.userService.login({
        username: this.userForm.value.username as string,
        password: this.userForm.value.password as string,
      }).subscribe({
        next: (token) => {
          this.authService.updateToken(token).then(() => {
            this.toastrService.success(`Logged in`, "Success");
            setTimeout(() => {this.router.navigateByUrl("/")}, 10);
          });
        },
        error: (response: HttpErrorResponse) => {
          if (response.error.status == 401){
            this.toastrService.error(response.error.message, "Denied");
          } else if (response.error.status == 404){
            this.toastrService.error(response.error.message, 'Denied');
          } else if (response.error.status == 500){
            this.toastrService.error("Please, contact an admin", "Internal error");
          }
        },
      })
    }
  }
}
