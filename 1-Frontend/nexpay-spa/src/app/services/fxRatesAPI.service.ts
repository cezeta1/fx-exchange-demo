// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Interfaces
import { Rate } from '../interfaces/FxRatesAPI/rate.interface';
import { Currency } from '../interfaces/FxRatesAPI/currency.interface';
import { GetRateQuotePayload } from '../interfaces/FxRatesAPI/Payloads/get-rate-quote-payload.interface';
// Services
import { NotificationService } from './notifications.service';
// Other
import { Observable, tap } from 'rxjs';
import { environment } from '../../common/environment';

@Injectable({
  providedIn: 'root',
})
export class FxRatesAPIService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  public getCurrencyOptions(): Observable<Currency[]> {
    return this.http
      .get<Currency[]>(environment.NexPayBFF + `currencies/all`, {})
      .pipe(
        tap({
          next: (data) => {},
          error: (e) => {
            this.notificationService.showError("Couldn't get Currencies");
          },
        })
      );
  }

  public getRateQuote(payload: GetRateQuotePayload): Observable<Rate> {
    return this.http
      .post<Rate>(environment.NexPayBFF + `rates`, { ...payload })
      .pipe(
        tap({
          next: (data) => {
            data.createdOn = new Date(data.createdOn);
            data.expiredOn = new Date(data.expiredOn);
            return data;
          },
          error: (e) => {
            this.notificationService.showError("Couldn't get the rate");
          },
        })
      );
  }
}
