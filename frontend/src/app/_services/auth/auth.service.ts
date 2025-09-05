import { inject, Injectable, signal, effect, WritableSignal, computed } from '@angular/core';
import { AuthState } from '../../interfaces/auth-state.interface';
import { LocalStorageService } from '../local-storage/local-storage';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  localStorageService = inject(LocalStorageService);

  authState: WritableSignal<AuthState> = signal<AuthState>({
    username: this.getUsername(),
    token: this.getToken(),
    isAuthenticated: this.verifyToken(this.getToken()),
  });

  username = computed(() => this.authState().username);
  token = computed(() => this.authState().token);
  isAuthenticated = computed(() => this.authState().isAuthenticated);

  constructor(){
    effect( () => {
      const token = this.authState().token;
      const username = this.authState().username;
      if(token !== null){
        this.localStorageService.setItem("token", token);
      } else {
        this.localStorageService.removeItem("token");
      }
      if(username !== null){
        this.localStorageService.setItem("username", username);
      } else {
        this.localStorageService.removeItem("username");
      }
    });
  }

  getUsername(){
    return this.localStorageService.getItem("username");
  }

  getToken(){
    return this.localStorageService.getItem("token");
  }

  async updateToken(token: string) {
    const decodedToken: any = jwtDecode(token);
    const username = decodedToken.username;
    this.authState.set({
      username: username,
      token: token,
      isAuthenticated: this.verifyToken(token)
    })
  }

  verifyToken(token: string | null): boolean {
    if(token !== null){
      try{
        const decodedToken = jwtDecode(token);
        const expiration = decodedToken.exp;
        if(expiration === undefined || Date.now() >= expiration * 1000){
          return false;
        } else {
          return true;
        }
      } catch(error) {
        return false;
      }
    }
    return false;
  }

  isUserAuthenticated(): boolean {
    return this.verifyToken(this.getToken());
  }

  logout(){
    this.authState.set({
      username: null,
      token: null,
      isAuthenticated: false
    });
  }
}
