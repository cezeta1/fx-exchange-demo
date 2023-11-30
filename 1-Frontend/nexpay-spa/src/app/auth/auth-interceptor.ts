// Angular
import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
// Other
import { authenticator } from './authenticator';
import { throwError } from 'rxjs';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const auth_token = authenticator.getToken() ?? 'No Token';
  if (auth_token == 'No Token') {
    return throwError(
      () => 'ERROR: No valid token available, cancelling request'
    );
  }
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth_token}`,
  });
  return next(req.clone({ headers: headers }));
};
