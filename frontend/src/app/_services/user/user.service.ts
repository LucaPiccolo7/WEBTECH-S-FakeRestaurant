import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { AuthRequest } from '../../interfaces/auth-request.interface';
import { IS_AUTH_ENABLED } from '../../_interceptors/auth/auth-interceptor';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient = inject(HttpClient);
  url = 'http://localhost:3000';
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  
  register(registerRequest: AuthRequest){
    const url = `${this.url}/register`;
    return this.httpClient.post(url, registerRequest, this.httpOptions);
  }

  login(loginRequest: AuthRequest) {
    const url = `${this.url}/login`;
    return this.httpClient.post<string>(url, loginRequest, this.httpOptions);
  }
}
