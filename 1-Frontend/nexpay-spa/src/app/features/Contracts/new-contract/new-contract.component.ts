// Angular
import { CommonModule } from '@angular/common';
import { Component, inject, Injector, OnInit } from '@angular/core';
// NgZorro
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
// Interfaces
import { Currency } from '../../../interfaces/FxRatesAPI/currency.interface';
// Services
import { FxRatesAPIService } from '../../../services/fxRatesAPI.service';
import { NotificationService } from '../../../services/notifications.service';
import { PaymentAPIService } from '../../../services/paymentAPI.service';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs';
import { authenticator } from '../../../auth/authenticator';
import { GetRateQuotePayload } from '../../../interfaces/FxRatesAPI/Payloads/get-rate-quote-payload.interface';
import { Rate } from '../../../interfaces/FxRatesAPI/rate.interface';
import { Contract } from '../../../interfaces/PaymentsAPI/contract.interface';
import { CreateContractPayload } from '../../../interfaces/PaymentsAPI/Payloads/create-contract-payload.interface';
import { cz_takeUntilDestroyed } from '../../../utils/utils';
import { CEZ_Validators } from '../../../utils/validators';
import { CZContractCardComponent } from './contract-card.component';

@Component({
  selector: 'new-contract-modal',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzSelectModule,
    NzInputNumberModule,
    NzTagModule,
    CZContractCardComponent,
  ],
  host: { ngSkipHydration: 'true' },
  template: `
    <div>
      <form [formGroup]="newContractForm" nz-form>
        <!-- From Currency -->
        <nz-form-item>
          <nz-form-label [nzSpan]="6" nzFor="fromCurr">From </nz-form-label>
          <nz-form-control [nzSpan]="14" nzErrorTip="Required">
            <nz-select formControlName="fromCurr" name="fromCurr">
              @for (fCurr of fromCurrencies; track $index) {
              <nz-option
                nzCustomContent
                [nzLabel]="fCurr.name"
                [nzValue]="fCurr.id"
              >
                {{ fCurr.symbol }} - {{ fCurr.name }}
              </nz-option>
              }
            </nz-select>
          </nz-form-control>
        </nz-form-item>

        <!-- Amount -->
        <nz-form-item>
          <nz-form-label [nzSpan]="6" nzFor="amount">Amount</nz-form-label>
          <nz-form-control [nzSpan]="14">
            <nz-input-number 
              name="amount"
              formControlName="amount"
              [nzMin]="0"
            >
              <span nzInputAddonBefore>{{ selectedFromCurrency?.symbol ?? ' ' }}</span>
            </nz-input-number>
          </nz-form-control>
        </nz-form-item>

        <!-- To Currency -->
        <nz-form-item>
          <nz-form-label [nzSpan]="6" nzFor="toCurr">To </nz-form-label>
          <nz-form-control [nzSpan]="14" nzErrorTip="Required">
            <nz-select formControlName="toCurr" id="toCurr">
              @for (tCurr of toCurrencies; track $index) {
                <nz-option
                  nzCustomContent
                  [nzLabel]="tCurr.name"
                  [nzValue]="tCurr.id"
                >
                  {{ tCurr.symbol }} - {{ tCurr.name }}
                </nz-option>
              }
            </nz-select>
          </nz-form-control>
        </nz-form-item>
      </form>

      <!-- Rate & Final amount -->
      <cz-contract-card
        [showCard]="loadingRate !== undefined"
        [rate]="currentRate"
        [amount]="getControlValue('amount')"
      ></cz-contract-card>
    </div>

    <!--- Footer --->
    <div *nzModalFooter>
      <button nz-button nzType="default" (click)="onCancel()">Cancel</button>
      <button
        nz-button
        nzType="primary"
        (click)="onConfirm()"
        [disabled]="loadingRate || !isValid"
        [nzLoading]="isConfirmLoading"
      >
        Confirm
      </button>
    </div>
  `,
  styles: ``,
})
export class NewContractsModalComponent implements OnInit {
  private _inj = inject(Injector);
  
  private paymentAPIService = inject(PaymentAPIService);
  private fxRatesAPIService = inject(FxRatesAPIService);
  private notificationsService = inject(NotificationService);
  private modal = inject(NzModalRef);

  protected isConfirmLoading: boolean = false;
  protected loadingRate!: boolean;

  private _currencyOptions: Currency[] = [];
  protected fromCurrencies: Currency[] = [];
  protected selectedFromCurrency!: Currency;
  protected toCurrencies: Currency[] = [];
  protected selectedToCurrency!: Currency;

  protected newContractForm!: FormGroup;

  protected currentRate?: Rate;
  protected finalAmount!: number;

  ngOnInit(): void {
    this._initForm();
    this._subscribeFormChanges();
    this._loadCurrencies();
  }

  private _initForm(): void {

    this.newContractForm = new FormGroup({
      fromCurr: new FormControl(null, [Validators.required]),
      toCurr: new FormControl(null, Validators.required),
      amount: new FormControl(0, [Validators.required, Validators.min(1)]),
    });
    
    this.getControl('fromCurr')?.addValidators([
      CEZ_Validators.notEqualValidator(this.getControl('toCurr')),
    ]);
    
    this.getControl('toCurr')?.addValidators([
      CEZ_Validators.notEqualValidator(this.getControl('fromCurr')),
    ]);
    
    this.newContractForm.disable();
    this.newContractForm.updateValueAndValidity();
  }

  private _subscribeFormChanges(): void {
    this.getControl('fromCurr')?.valueChanges
      .pipe(cz_takeUntilDestroyed(this._inj))  
      .subscribe((val: any) =>
        this._onDropdownChanges(true, val)
      );

    this.getControl('toCurr')?.valueChanges
      .pipe(cz_takeUntilDestroyed(this._inj))
      .subscribe((val: any) =>
        this._onDropdownChanges(false, val)
      );

    this.getControl('amount')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        cz_takeUntilDestroyed(this._inj)
      )
      .subscribe((value: number) => {
        if (this.newContractForm.valid)
          this._getFxRate();
      });
  }

  private _loadCurrencies(): void {
    this.fxRatesAPIService
      .getCurrencyOptions()
      .pipe(cz_takeUntilDestroyed(this._inj))
      .subscribe({
        next: (data: Currency[]) => {
          this._currencyOptions = [...data];
          this.newContractForm.enable();
          this._updateCurrencyOptions();
        },
      });
  }
  
  private _onDropdownChanges(isFrom: boolean, newVal: number): void {
    const idx = this._currencyOptions.findIndex((c) => c.id === newVal);
    this[isFrom ? 'selectedFromCurrency' : 'selectedToCurrency'] =
      this._currencyOptions[idx] ?? undefined;

    if (
      this.getControlValue('fromCurr') !== null &&
      this.getControlValue('toCurr') !== null &&
      this.getControlValue('amount') !== 0
    ) {
      this._updateCurrencyOptions();
      this._getFxRate();
    }
  }

  private _updateCurrencyOptions(): void {
    const filterFunc = (ctrl: string) => (c: Currency) =>
      c.id !== this.getControlValue(ctrl);
    this.fromCurrencies = this._currencyOptions.filter(filterFunc('toCurr'));
    this.toCurrencies = this._currencyOptions.filter(filterFunc('fromCurr'));
  }

  private _getFxRate() {
    this.currentRate = undefined;
    const payload: GetRateQuotePayload = {
      fromId: this.getControlValue('fromCurr'),
      toId: this.getControlValue('toCurr'),
      amount: this.getControlValue('amount'),
    };

    this.loadingRate = true;
    
    this.fxRatesAPIService
      .getRateQuote(payload)
      .pipe(cz_takeUntilDestroyed(this._inj))
      .subscribe({
        next: (rate: Rate) => {
          this.currentRate = { ...rate };
          this.loadingRate = false;
        },
        error: () => this.loadingRate = false,
      });
  }

  // On Actions
  protected onConfirm() {
    this.isConfirmLoading = true;
    
    if (!this.currentRate?.id) 
      return;
    
    // Create new Contract
    
    let payload: CreateContractPayload = {
      userId: authenticator.getCurrentUserId() ?? '-',
      rateId: this.currentRate?.id,
      amount: this.getControlValue('amount'),
    };

    this.paymentAPIService
      .createContract(payload)
      .pipe(cz_takeUntilDestroyed(this._inj))
      .subscribe({
        next: (_: Contract) => {
          this.notificationsService.showSuccess('Success!');
          this.isConfirmLoading = false;
          this._destroyModal(true);
        },
        error: () => this.isConfirmLoading = false
      });
  }

  protected onCancel() {
    this._destroyModal(false);
  }

  // Utils
  protected getControl = (name: string) => 
    this.newContractForm.get(name);
  
  protected getControlValue = (name: string) =>
    this.newContractForm.get(name)?.value;
  
  protected get isValid() {
    return (
      this.newContractForm.valid &&
      this.currentRate &&
      new Date() < (this.currentRate?.expiredOn ?? 0)
    );
  }
  
  private _destroyModal(result?: any) {
    this.modal.destroy(result);
  }
}
