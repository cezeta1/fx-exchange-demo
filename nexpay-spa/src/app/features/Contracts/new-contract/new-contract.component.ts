import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { PaymentAPIService } from '../../../services/paymentAPI.service';

import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NotificationService } from '../../../services/notifications.service';
import { FxRatesAPIService } from '../../../services/fxRatesAPI.service';
import {
  Currency,
  currencies,
} from '../../../interfaces/FxRatesAPI/currency.interface';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCardModule } from 'ng-zorro-antd/card';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Rate } from '../../../interfaces/FxRatesAPI/rate.interface';
import { CZValidUntilTagComponent } from './valid-until-tag.component';
import { CZContractCardComponent } from './contract-card.component';
import { Contract } from '../../../interfaces/PaymentsAPI/contract.interface';
import { CreateContractPayload } from '../../../interfaces/PaymentsAPI/Payloads/create-contract-payload.interface';

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
              [nzAddOnBefore]="selectedFromCurrency?.symbol ?? '-'"
            >
              <nz-input-number
                formControlName="amount"
                name="amount"
                [nzMin]="0"
              ></nz-input-number>
            </nz-input-number-group>
          </nz-form-control>
        </nz-form-item>

        <!-- To Currency -->
        <nz-form-item>
          <nz-form-label [nzSpan]="6" nzFor="toCurr">To </nz-form-label>
          <nz-form-control [nzSpan]="14">
            <nz-select formControlName="toCurr" name="toCurr">
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

        <!-- Rate -->

        <!-- Final Amount -->
      </form>

      <cz-contract-card
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
        [disabled]="!isValid"
        [nzLoading]="isConfirmLoading"
      >
        <!-- loading ||  -->
        Confirm
      </button>
    </div>
  `,
  styles: ``,
})
export class NewContractsModalComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  protected isConfirmLoading: boolean = false;
  protected loading: boolean = false;

  private _currencyOptions: Currency[] = [];
  protected fromCurrencies: Currency[] = [];
  protected selectedFromCurrency!: Currency;
  protected toCurrencies: Currency[] = [];
  protected selectedToCurrency!: Currency;

  protected newContractForm!: FormGroup;

  private _today = new Date();
  private _tomorrow = this._addDays(this._today);
  private _addDays(date: Date, days: number = 1): Date {
    var temp = new Date(date);
    // temp.setDate(date.getDate() + days);
    temp.setSeconds(temp.getSeconds() + 10);
    return temp;
  }

  protected currentRate: Rate = {
    id: 'asdasdasjdkda',
    currencyFrom: this.selectedFromCurrency,
    currencyTo: this.selectedFromCurrency,
    exchangeRate: 0.53,
    quotedOn: this._today,
    expiredOn: this._tomorrow,
  } as Rate;

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

    this._currencyOptions = [...currencies];
    this._updateCurrencyOptions();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private _initForm(): void {
    this.newContractForm = new FormGroup({
      fromCurr: new FormControl(null, Validators.required),
      toCurr: new FormControl(null, Validators.required),
      amount: new FormControl(0, Validators.required),
    });
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
      },
    });
  }
  private _loadCurrencies(): void {
    this.subs.sink = this.fxRatesAPIService.getCurrencyOptions().subscribe({
      next: (data: Currency[]) => {
        this._currencyOptions = [...data];
        this._updateCurrencyOptions();
      },
    });
  }
  private _updateCurrencyOptions(): void {
    const tempCurrOpt = this._currencyOptions.filter(
      (c) =>
        c.id !== this.getControlValue('fromCurr') &&
        c.id !== this.getControlValue('toCurr')
    );
    // debugger;
    this.fromCurrencies = [...tempCurrOpt];
    this.toCurrencies = [...tempCurrOpt];
  }

  private _getFxRate() {
    this.loading = true;
    this.subs.sink = this.fxRatesAPIService.getRate().subscribe({
      next: (rate: Rate) => {
        this.currentRate = { ...rate };
        this.loading = false;
      },
    });
    this._updateRate();
  }

  // On Actions
  protected onConfirm() {
    this.isConfirmLoading = true;
    setTimeout(() => {
      debugger;
      let payload: CreateContractPayload = {} as CreateContractPayload;
      this.paymentAPIService.createContract(payload).subscribe({
        next: (rate: Contract) => {
          this.loading = false;
        },
      });
      // Create new Contract
      this.notificationsService.showSuccess('Success!');
      this._destroyModal();
      this.isConfirmLoading = false;
    }, 3000);
  }
  protected onCancel() {
    this._destroyModal();
  }

  // Utils
  private _updateRate() {
    this._tomorrow = this._addDays(new Date());
    this.currentRate = {
      id: 'asdasdasjdkda',
      currencyFrom: this.selectedFromCurrency,
      currencyTo: this.selectedFromCurrency,
      exchangeRate: 0.53,
      quotedOn: this._today,
      expiredOn: this._tomorrow,
    } as Rate;
  }
  protected getControlValue(name: string) {
    return this.newContractForm.get(name)?.value;
  }
  protected get isValid() {
    return (
      this.newContractForm.valid && new Date() < this.currentRate.expiredOn
    );
  }
  private _destroyModal() {
    this.modal.destroy();
  }
}
