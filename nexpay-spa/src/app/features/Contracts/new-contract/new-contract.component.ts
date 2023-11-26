import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { PaymentAPIService } from '../../../services/paymentAPI.service';

import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NotificationService } from '../../../services/notifications.service';
import { FxRatesAPIService } from '../../../services/fxRatesAPI.service';
import { Currency } from '../../../interfaces/FxRatesAPI/currency.interface';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTagModule } from 'ng-zorro-antd/tag';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Rate } from '../../../interfaces/FxRatesAPI/rate.interface';
import { CZContractCardComponent } from './contract-card.component';
import { Contract } from '../../../interfaces/PaymentsAPI/contract.interface';
import { CreateContractPayload } from '../../../interfaces/PaymentsAPI/Payloads/create-contract-payload.interface';
import { GetRateQuotePayload } from '../../../interfaces/FxRatesAPI/Payloads/get-rate-quote-payload.interface';
import { authenticator } from '../../../auth/authenticator';
import { CEZ_Validators } from '../../../utils/validators';

@Component({
  selector: 'new-contract-modal',
  standalone: true,
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
            <nz-input-number-group
              style="width:100%"
              [nzAddOnBefore]="selectedFromCurrency?.symbol ?? ' '"
            >
              <nz-input-number
                name="amount"
                formControlName="amount"
                [nzMin]="0"
              ></nz-input-number>
            </nz-input-number-group>
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
export class NewContractsModalComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

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

  constructor(
    private paymentAPIService: PaymentAPIService,
    private fxRatesAPIService: FxRatesAPIService,
    private notificationsService: NotificationService,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._subscribeFormChanges();
    this._loadCurrencies();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
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
  }
  private _subscribeFormChanges(): void {
    this.subs.sink = this.newContractForm.valueChanges.subscribe({
      next: (newVal: any) => {
        if (this.newContractForm.valid) {
          this._getFxRate();
        }
        const fi = this._currencyOptions.findIndex(
          (c) => c.id === newVal.fromCurr
        );
        const ti = this._currencyOptions.findIndex(
          (c) => c.id === newVal.toCurr
        );
        this.selectedFromCurrency = this._currencyOptions[fi] ?? undefined;
        this.selectedToCurrency = this._currencyOptions[ti] ?? undefined;
        if (newVal.amount > 0) this._updateCurrencyOptions();
      },
    });
  }
  private _loadCurrencies(): void {
    this.subs.sink = this.fxRatesAPIService.getCurrencyOptions().subscribe({
      next: (data: Currency[]) => {
        this._currencyOptions = [...data];
        this.newContractForm.enable();
        this._updateCurrencyOptions();
      },
    });
  }
  private _updateCurrencyOptions(): void {
    this.fromCurrencies = this._currencyOptions.filter(
      (c) => c.id !== this.getControlValue('toCurr')
    );
    this.toCurrencies = this._currencyOptions.filter(
      (c) => c.id !== this.getControlValue('fromCurr')
    );
  }

  private _getFxRate() {
    this.currentRate = undefined;
    const payload: GetRateQuotePayload = {
      fromId: this.getControlValue('fromCurr'),
      toId: this.getControlValue('toCurr'),
      amount: this.getControlValue('amount'),
    };
    this.loadingRate = true;
    this.subs.sink = this.fxRatesAPIService.getRateQuote(payload).subscribe({
      next: (rate: Rate) => {
        this.currentRate = { ...rate };
        this.loadingRate = false;
      },
      error: () => {
        this.loadingRate = false;
      },
    });
  }

  // On Actions
  protected onConfirm() {
    this.isConfirmLoading = true;
    if (!this.currentRate?.id) return;
    // Create new Contract
    let payload: CreateContractPayload = {
      userId: authenticator.getCurrentUserId() ?? '-',
      rateId: this.currentRate?.id,
      amount: this.getControlValue('amount'),
    };
    this.paymentAPIService.createContract(payload).subscribe({
      next: (rate: Contract) => {
        this.notificationsService.showSuccess('Success!');
        this.isConfirmLoading = false;
        this._destroyModal(true);
      },
      error: (error) => {
        this.isConfirmLoading = false;
      },
    });
  }
  protected onCancel() {
    this._destroyModal(false);
  }

  // Utils
  protected getControl = (name: string) => this.newContractForm.get(name);
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
