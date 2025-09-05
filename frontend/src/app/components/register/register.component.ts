import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  routerService = inject(Router);
  userService = inject(UserService);
  toastrService = inject(ToastrService);

  submitted = false;
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)])
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
      this.userService.register({
      username: this.userForm.value.username as string,
      password: this.userForm.value.password as string,
      }).subscribe({
        error: (response: HttpErrorResponse) => {
          if(response.error.status == 409){
            this.toastrService.error(response.error.message, "Denied");
          } else if (response.error.status == 500){
            this.toastrService.error("Please, contact an admin", "Internal error");
          }
        },
        complete: () => {
          this.toastrService.success("Account created", "Success");
          this.routerService.navigateByUrl("/login");
        }
      });
    }
  }
}
