import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Rate } from '../../../interfaces/FxRatesAPI/rate.interface';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CZValidUntilTagComponent } from './valid-until-tag.component';

@Component({
  selector: 'cz-contract-card',
  standalone: true,
  imports: [CommonModule, NzCardModule, CZValidUntilTagComponent],
  host: { ngSkipHydration: 'true' },
  template: `
    <!-- //   <nz-form-label [nzSpan]="6" nzFor="finalAmount">
  //     Final Amount
  //   </nz-form-label>
  //   <nz-form-control [nzSpan]="14">
  //     <nz-input-number-group
  //       [nzAddOnBefore]="selectedToCurrency?.symbol ?? '-'"
  //     >
  //       <nz-input-number
  //         [ngModel]="finalAmount"
  //         [nzMin]="1"
  //         [nzMax]="10"
  //         [nzStep]="1"
  //       ></nz-input-number>
  //     </nz-input-number-group>
  //   </nz-form-control> -->

    @if (rate && amount !== undefined) {
    <nz-card style="display: flex; flex-direction: vertical">
      <div style="width: 100%; margin-bottom: 10px">
        Current Rate: {{ rate.exchangeRate }}
      </div>
      <div style="width: 100%; margin-bottom: 10px">
        Final Amount:
        {{ rate.currencyTo?.symbol ?? '-' + ' ' }}
        {{ getFinalAmount | number : '1.2' }}
      </div>
      <cz-valid-until-tag
        [expiredOn]="rate.expiredOn"
        customText="Rate valid until: "
        customExpiredText="Rate expired"
      ></cz-valid-until-tag>
    </nz-card>
    }
  `,
  styles: ``,
})
export class CZContractCardComponent implements OnInit {
  @Input() rate!: Rate;
  @Input() amount!: number;

  constructor() {}

  ngOnInit(): void {}

  protected get getFinalAmount() {
    return this.amount * this.rate.exchangeRate;
  }
}
