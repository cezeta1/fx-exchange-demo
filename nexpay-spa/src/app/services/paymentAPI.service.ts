import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, tap } from 'rxjs';
import { Contract } from '../interfaces/contract.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../common/environment';
import { NotificationService } from './notifications.service';
import { ContractStatus } from '../interfaces/contract-status.interface';

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
      .get<Contract[]>(environment.PaymentAPI + `users/${userId}/contracts`, {})
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
      .get<Contract[]>(environment.PaymentAPI + `contracts`, {})
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

  public createContract(payload: Contract): Observable<Contract> {
    return this.http
      .post<Contract>(environment.PaymentAPI + `contracts`, payload)
      .pipe(
        tap({
          next: (data) => {},
          error: (e) => {
            this.notificationService.showError("Couldn't create Contract");
          },
        })
      );
  }

  public updateContractStatus(payload: {
    contractId: string;
    status: ContractStatus;
  }): Observable<Contract> {
    return this.http
      .put<Contract>(
        environment.PaymentAPI + `contracts/${payload.contractId}`,
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
