import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../common/environment';
import { NotificationService } from './notifications.service';
import { Rate } from '../interfaces/FxRatesAPI/rate.interface';
import { Currency } from '../interfaces/FxRatesAPI/currency.interface';

@Injectable({
  providedIn: 'root',
})
export class FxRatesAPIService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  public getCurrencyOptions(): Observable<Currency[]> {
    return this.http.get<Currency[]>(environment.FxAPI + `currencies`, {}).pipe(
      tap({
        next: (data) => {},
        error: (e) => {
          this.notificationService.showError("Couldn't get Currencies");
        },
      })
    );
  }

  public getRate(): Observable<Rate> {
    return this.http.get<Rate>(environment.FxRatesAPI + `rates`, {}).pipe(
      tap({
        next: (data) => {},
        error: (e) => {
          this.notificationService.showError("Couldn't get the rate");
        },
      })
    );
  }
}
