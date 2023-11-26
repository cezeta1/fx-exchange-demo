import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Contract } from '../interfaces/PaymentsAPI/contract.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../common/environment';
import { NotificationService } from './notifications.service';
import { CreateContractPayload } from '../interfaces/PaymentsAPI/Payloads/create-contract-payload.interface';
import { UpdateContractStatusPayload } from '../interfaces/PaymentsAPI/Payloads/update-contract-status-payload.interface';

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

  public getAllContracts(userId: string): Observable<Contract[]> {
    return this.http
      .get<Contract[]>(environment.NexPayBFF + `contracts`, {})
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
