import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { authenticator } from './authenticator';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const auth_token = authenticator.getToken() ?? 'No Token';
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth_token}`,
  });
  return next(req.clone({ headers: headers }));
};
