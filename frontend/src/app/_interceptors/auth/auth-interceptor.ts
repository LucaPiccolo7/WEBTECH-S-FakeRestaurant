import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpContextToken } from '@angular/common/http';
import { AuthService } from '../../_services/auth/auth.service';

export const IS_AUTH_ENABLED = new HttpContextToken(() => true);

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const authToken = authService.getToken();
  if (authToken && (req.context.get(IS_AUTH_ENABLED) === true)) {
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken,
      }
    });
  }
  
  return next(req);
}