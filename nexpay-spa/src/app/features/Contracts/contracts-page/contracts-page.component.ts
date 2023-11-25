import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Contract } from '../../../interfaces/PaymentsAPI/contract.interface';
import { SubSink } from 'subsink';
import { PaymentAPIService } from '../../../services/paymentAPI.service';
import { ContractStatusEnum } from '../../../interfaces/PaymentsAPI/contract-status.enum';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { CZTagComponent } from '../../../components/shared/cz-tag/cz-tag.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NewContractsModalComponent } from '../new-contract/new-contract.component';
import { CZModalService } from '../../../services/modal.service';
import { authenticator } from '../../../authenticator';

interface ColumnConfig<T> {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<T> | null;
  sortDirections: NzTableSortOrder[];
  // listOfFilter: NzTableFilterList;
  // filterFn: NzTableFilterFn<T> | null;
  // filterMultiple: boolean;
}

@Component({
  selector: 'contracts-page',
  standalone: true,
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
          <td>{{ data.fromCurrency.symbol }}</td>
          <td>{{ data.toCurrency.symbol }}</td>
          <td>{{ data.amount }}</td>
          <td>{{ data.exchangeRate }}</td>
          <td>{{ data.convertedAmount }}</td>
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
  `,
})
export class ContractsPageComponent implements OnInit, OnDestroy {
  protected ContractStatusEnum = ContractStatusEnum;
  private subs = new SubSink();

  protected contracts: Contract[] = [];

  protected tableColumns: ColumnConfig<Contract>[] = [];
  constructor(
    private paymentAPIService: PaymentAPIService,
    private modalService: CZModalService
  ) {}

  ngOnInit(): void {
    this._loadUserContracts();
    this._initTableConfig();
    this.contracts = [...this.contracts, ...this.contracts];
    this.contracts = [...this.contracts, ...this.contracts];
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private _loadUserContracts(): void {
    // TODO: uncomment after BFF implementation
    // this.subs.sink = this.paymentAPIService
    //   .getUserContracts(authenticator.getCurrentUserId())
    //   .subscribe({
    //     next: (data: Contract[]) => {
    //       debugger;
    //       this.contracts = [...data];
    //     },
    //   });
  }

  private _onModalCloseEmitter: EventEmitter<any> = new EventEmitter();
  protected onNewContract(): void {
    this.modalService.createModal(
      <any>NewContractsModalComponent,
      this._onModalCloseEmitter
    );
    this.subs.sink = this._onModalCloseEmitter.subscribe({
      next: (reloadTable: boolean) => {
        if (reloadTable) this._loadUserContracts();
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
        name: 'From',
        sortOrder: null,
        sortFn: (a: Contract, b: Contract) =>
          a.fromCurrency.name.localeCompare(b.fromCurrency.name),
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: 'To',
        sortOrder: null,
        sortFn: (a: Contract, b: Contract) =>
          a.toCurrency.name.localeCompare(b.toCurrency.name),
        sortDirections: ['ascend', 'descend', null],
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
          a.exchangeRate > b.exchangeRate ? 1 : -1,
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
