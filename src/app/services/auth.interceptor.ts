import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).accessToken();
  const url = request.url.startsWith('/') ? `${environment.apiUrl}${request.url}` : request.url;
  return next(request.clone({ url, setHeaders: token ? { Authorization: `Bearer ${token}` } : {} }));
};
