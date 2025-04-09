// Angular
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
// Interfaces
import { Currency } from '../interfaces/FxRatesAPI/currency.interface';
import { GetRateQuotePayload } from '../interfaces/FxRatesAPI/Payloads/get-rate-quote-payload.interface';
import { Rate } from '../interfaces/FxRatesAPI/rate.interface';
// Services
import { NotificationService } from './notifications.service';
// Other
import { Observable, tap } from 'rxjs';
import { environment } from '../../common/environment';

@Injectable({ providedIn: 'root' })
export class FxRatesAPIService {

  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);

  public getCurrencyOptions = (): Observable<Currency[]> => 
    this.http
      .get<Currency[]>(environment.BFF + `currencies/all`, {})
      .pipe( 
        tap({ error: _ => this.notificationService.showError("Couldn't get Currencies") })
      );

  public getRateQuote = (payload: GetRateQuotePayload): Observable<Rate> => 
    this.http
      .post<Rate>(environment.BFF + `rates`, { ...payload })
      .pipe(
        tap({
          next: (data) => {
            data.createdOn = new Date(data.createdOn);
            data.expiredOn = new Date(data.expiredOn);
            return data;
          },
          error: _ => this.notificationService.showError("Couldn't get the rate")
        })
      );
}
