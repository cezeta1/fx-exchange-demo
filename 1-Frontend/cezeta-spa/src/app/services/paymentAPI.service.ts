// Angular
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
// Interfaces
import { Contract } from '../interfaces/PaymentsAPI/contract.interface';
import { CreateContractPayload } from '../interfaces/PaymentsAPI/Payloads/create-contract-payload.interface';
import { UpdateContractStatusPayload } from '../interfaces/PaymentsAPI/Payloads/update-contract-status-payload.interface';
// Services
import { NotificationService } from './notifications.service';
// Other
import { Observable, tap } from 'rxjs';
import { environment } from '../../common/environment';

@Injectable({ providedIn: 'root' })
export class PaymentAPIService {

  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);

  public getUserContracts = (userId: string): Observable<Contract[]> =>
    this.http
      .get<Contract[]>(environment.BFF + `users/${userId}/contracts`, {})
      .pipe(
        tap({ error: _ => this.notificationService.showError("Couldn't get user Contracts") })
      );

  public getAllContracts = (): Observable<Contract[]> => 
    this.http
      .get<Contract[]>(environment.BFF + `contracts/all`, {})
      .pipe(
        tap({ error: _ => this.notificationService.showError("Couldn't get all user Contracts")})
      );

  public createContract = (payload: CreateContractPayload): Observable<Contract> =>
    this.http
      .post<Contract>(environment.BFF + `contracts`, payload)
      .pipe(
        tap({ error: _ => this.notificationService.showError("Couldn't create Contract") })
      );

  public updateContractStatus = (payload: UpdateContractStatusPayload): Observable<Contract> =>
    this.http
      .put<Contract>(
        environment.BFF + `contracts/${payload.contractId}`,
        payload
      )
      .pipe(
        tap({ error: _ => this.notificationService.showError("Couldn't update Contract status") })
      );
}