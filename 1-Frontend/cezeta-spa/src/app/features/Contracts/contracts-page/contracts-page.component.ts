// Angular
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Injector, OnInit } from '@angular/core';
// NgZorro
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
// Components
import { CZTagComponent } from '../../../components/shared/cz-tag/cz-tag.component';
import { NewContractsModalComponent } from '../new-contract/new-contract.component';
// Interfaces
import { ContractStatusEnum } from '../../../interfaces/PaymentsAPI/contract-status.enum';
import { Contract } from '../../../interfaces/PaymentsAPI/contract.interface';
// Services
import { CZModalService } from '../../../services/modal.service';
import { PaymentAPIService } from '../../../services/paymentAPI.service';
// Other
import { authenticator } from '../../../auth/authenticator';
import { cz_takeUntilDestroyed } from '../../../utils/utils';

interface ColumnConfig<T> {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<T> | null;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'contracts-page',
  imports: [
    CommonModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    CZTagComponent,
  ],
  host: { ngSkipHydration: 'true' },
  template: `
    <h1>CONTRACTS</h1>
    <div class="cz-toolbar">
      <button
        nz-button
        nzType="primary"
        style="float:right"
        (click)="onNewContract()"
      >
        New Contract
      </button>
    </div>
    <nz-table
      #filterTable
      [nzData]="contracts"
      [nzPageSize]="6"
      nzTableLayout="fixed"
    >
      <thead>
        <tr>
          <th
            *ngFor="let column of tableColumns"
            [nzSortOrder]="column.sortOrder"
            [nzSortFn]="column.sortFn"
            [nzSortDirections]="column.sortDirections"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of filterTable.data">
          <td>{{ data.id }}</td>
          <td class="cz-table-cell">
            {{
              (data.amount | number : '1.2') +
                ' ' +
                data?.rate?.currencyFrom?.symbol
            }}
          </td>
          <td class="cz-table-cell">{{ data.rate.exchangeRate }}</td>
          <td class="cz-table-cell">
            {{
              (data.amount * data.rate.exchangeRate | number : '1.2') +
                ' ' +
                data?.rate?.currencyTo?.symbol
            }}
          </td>
          <td>
            <cz-tag
              [type]="getStatusTagType(data.status)"
              [text]="ContractStatusEnum[data.status]"
            ></cz-tag>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles: `
    .cz-toolbar {
      display: inline-flex;
      width: 100%; 
      justify-content: end;
      margin-bottom: 10px;
    }
    .cz-table-cell {
      text-align: right;
    }
  `,
})
export class ContractsPageComponent implements OnInit {
  private _inj = inject(Injector);
  private paymentAPIService = inject(PaymentAPIService);
  private modalService = inject(CZModalService);

  protected ContractStatusEnum = ContractStatusEnum;
  protected contracts: Contract[] = [];
  protected tableColumns: ColumnConfig<Contract>[] = [];  

  ngOnInit(): void {
    this._initTableConfig();
    this._loadUserContracts();
  }

  private _loadUserContracts(): void {
    if (!authenticator.getCurrentUserId()) 
      return;
    
    this.paymentAPIService
      .getUserContracts(authenticator.getCurrentUserId() ?? '-')
      .pipe(cz_takeUntilDestroyed(this._inj))
      .subscribe({
        next: (data: Contract[]) => {
          this.contracts = [...data];
        },
      });
  }

  private _onModalCloseEmitter: EventEmitter<any> = new EventEmitter();
  
  protected onNewContract(): void {
    
    this.modalService.createModal(
      <any>NewContractsModalComponent,
      this._onModalCloseEmitter
    );

    this._onModalCloseEmitter
      .pipe(cz_takeUntilDestroyed(this._inj))
      .subscribe({
        next: (reloadTable: boolean) => {
          if (reloadTable) 
            this._loadUserContracts();
        },
      });
  }

  private _initTableConfig(): void {
    this.tableColumns = [
      {
        name: 'Id',
        sortOrder: null,
        sortFn: null,
        sortDirections: [null],
      },
      {
        name: 'Amount',
        sortOrder: null,
        sortFn: (a: Contract, b: Contract) => (a.amount > b.amount ? 1 : -1),
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: 'Exchange Rate',
        sortOrder: null,
        sortFn: (a: Contract, b: Contract) =>
          a.rate.exchangeRate > b.rate.exchangeRate ? 1 : -1,
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: 'Converted Amount',
        sortOrder: null,
        sortFn: (a: Contract, b: Contract) =>
          a.convertedAmount > b.convertedAmount ? 1 : -1,
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: 'Status',
        sortOrder: null,
        sortFn: (a: Contract, b: Contract) =>
          ContractStatusEnum[a.status].localeCompare(
            ContractStatusEnum[b.status]
          ),
        sortDirections: ['ascend', 'descend', null],
      },
    ];
  }

  // Utils
  protected getStatusTagType(
    s: ContractStatusEnum
  ): 'success' | 'error' | 'warning' | null {
    // TODO: This shouldn't be a function, as it gets called everytime Angular refreshes
    switch (s) {
      case ContractStatusEnum.Pending:
        return 'warning';
      case ContractStatusEnum.Completed:
        return 'success';
      case ContractStatusEnum.Cancelled:
        return 'error';
      default:
        return null;
    }
  }
}
