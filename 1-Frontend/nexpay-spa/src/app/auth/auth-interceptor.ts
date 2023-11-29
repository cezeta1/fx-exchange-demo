// Angular
import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
// Other
import { authenticator } from './authenticator';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const auth_token = authenticator.getToken() ?? 'No Token';
  debugger;
  // const headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: `Bearer ${auth_token}`,
  // });
  // return next(req.clone({ headers: headers }));
  req.headers.set('Content-Type', 'application/json');
  req.headers.set('Access-Control-Allow-Origin', 'http://localhost:4200');
  req.headers.set('Access-Control-Allow-Credentials', 'true');
  // req.headers.append('Access-Control-Allow-Origin', 'http://localhost:4000');
  // req.headers.append('Access-Control-Allow-Credentials', 'true');
  req.headers.set('Authorization', `Bearer ${auth_token}`);
  return next(req.clone());
};
