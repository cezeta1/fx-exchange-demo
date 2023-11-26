// Angular
import { Injectable } from '@angular/core';
import { NotificationService } from './notifications.service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../common/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  public signUp(): Observable<boolean> {
    return this.http.post<boolean>(environment.JWTAuthAPI + 'users', {}).pipe(
      tap({
        next: (data) => {},
        error: (e) => {
          this.notificationService.showError("Couldn't create new account");
        },
      })
    );
  }

  public logOut(): Observable<boolean> {
    return this.http
      .put<boolean>(environment.JWTAuthAPI + 'auth/logout', {})
      .pipe(
        tap({
          next: (data) => {},
          error: (e) => {
            this.notificationService.showError(
              'There has been an error when logging out'
            );
          },
        })
      );
  }

  public logIn(payload: {
    email: string;
    password: string;
  }): Observable<string> {
    return this.http
      .get<string>(environment.JWTAuthAPI + 'auth/logout', { params: payload })
      .pipe(
        tap({
          next: (data) => {},
          error: (e) => {
            this.notificationService.showError(
              "Couldn't log in with provided credentials",
              'Please check that email and password are correct'
            );
          },
        })
      );
  }
}
