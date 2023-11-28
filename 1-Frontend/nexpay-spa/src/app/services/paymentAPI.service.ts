// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Interfaces
import { Contract } from '../interfaces/PaymentsAPI/contract.interface';
import { CreateContractPayload } from '../interfaces/PaymentsAPI/Payloads/create-contract-payload.interface';
import { UpdateContractStatusPayload } from '../interfaces/PaymentsAPI/Payloads/update-contract-status-payload.interface';
// Services
import { NotificationService } from './notifications.service';
// Other
import { Observable, tap } from 'rxjs';
import { environment } from '../../common/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentAPIService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  public getUserContracts(userId: string): Observable<Contract[]> {
    return this.http
      .get<Contract[]>(environment.NexPayBFF + `users/${userId}/contracts`, {})
      .pipe(
        tap({
          next: (data) => {},
          error: (e) => {
            this.notificationService.showError("Couldn't get user Contracts");
          },
        })
      );
  }

  public getAllContracts(): Observable<Contract[]> {
    return this.http
      .get<Contract[]>(environment.NexPayBFF + `contracts/all`, {})
      .pipe(
        tap({
          next: (data) => {},
          error: (e) => {
            this.notificationService.showError(
              "Couldn't get all user Contracts"
            );
          },
        })
      );
  }

  public createContract(payload: CreateContractPayload): Observable<Contract> {
    return this.http
      .post<Contract>(environment.NexPayBFF + `contracts`, payload)
      .pipe(
        tap({
          next: (data) => {},
          error: (e) => {
            this.notificationService.showError("Couldn't create Contract");
          },
        })
      );
  }

  public updateContractStatus(
    payload: UpdateContractStatusPayload
  ): Observable<Contract> {
    return this.http
      .put<Contract>(
        environment.NexPayBFF + `contracts/${payload.contractId}`,
        payload
      )
      .pipe(
        tap({
          next: (data) => {},
          error: (e) => {
            this.notificationService.showError(
              "Couldn't update Contract status"
            );
          },
        })
      );
  }
}
