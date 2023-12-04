// Angular
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// NgZorro
import {
  NzTableModule,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
// Components
import { CZTagComponent } from '../../../components/shared/cz-tag/cz-tag.component';
// Interfaces
import { Contract } from '../../../interfaces/PaymentsAPI/contract.interface';
import { ContractStatusEnum } from '../../../interfaces/PaymentsAPI/contract-status.enum';
// Services
import { PaymentAPIService } from '../../../services/paymentAPI.service';
import { NotificationService } from '../../../services/notifications.service';
// Other
import { SubSink } from 'subsink';
import { authenticator } from '../../../auth/authenticator';

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
  selector: 'admin-page',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzTableModule,
    NzIconModule,
    CZTagComponent,
  ],
  host: { ngSkipHydration: 'true' },
  template: `
    <h1>ADMIN</h1>
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
          <td>{{ data.createdBy.fullName }}</td>
          <td>{{ data.approvedBy?.fullName ?? '-' }}</td>
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
          <td>
            @if (data.status === ContractStatusEnum.Pending) {
            <nz-button-group>
              <button
                nz-button
                nzType="primary"
                (click)="onChangeStatus(data.id, ContractStatusEnum.Completed)"
              >
                <span nz-icon nzType="check" nzTheme="outline"></span>
              </button>
              <button
                nz-button
                nzType="default"
                (click)="onChangeStatus(data.id, ContractStatusEnum.Cancelled)"
              >
                <span nz-icon nzType="close" nzTheme="outline"></span>
              </button>
            </nz-button-group>
            }
          </td>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles: `
    .cz-table-cell {
      text-align: right;
    }
  `,
})
export class AdminPageComponent {
  protected ContractStatusEnum = ContractStatusEnum;
  private subs = new SubSink();

  protected contracts: Contract[] = [];

  protected tableColumns: ColumnConfig<Contract>[] = [];

  constructor(
    private notificationService: NotificationService,
    private paymentAPIService: PaymentAPIService
  ) {}

  ngOnInit(): void {
    this._initTableConfig();
    this._loadAllContracts();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private _loadAllContracts(): void {
    if (!authenticator.getCurrentUserId()) return;
    this.subs.sink = this.paymentAPIService.getAllContracts().subscribe({
      next: (data: Contract[]) => {
        this.contracts = [...data];
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
        name: 'Created By',
        sortOrder: null,
        sortFn: (a: Contract, b: Contract) =>
          a.createdBy.fullName > b.createdBy.fullName ? 1 : -1,
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: 'Approved/Rejected By',
        sortOrder: null,
        sortFn: (a: Contract, b: Contract) => {
          const aName = a.approvedBy?.fullName;
          const bName = b.approvedBy?.fullName;
          if (!aName && !bName) return 1;
          if (!aName) return 1;
          if (!bName) return -1;
          return aName > bName ? 1 : -1;
        },
        sortDirections: ['ascend', 'descend', null],
      },
      // {
      //   name: 'From',
      //   sortOrder: null,
      //   sortFn: (a: Contract, b: Contract) =>
      //     a.rate.currencyFrom.name.localeCompare(b.rate.currencyFrom.name),
      //   sortDirections: ['ascend', 'descend', null],
      // },
      // {
      //   name: 'To',
      //   sortOrder: null,
      //   sortFn: (a: Contract, b: Contract) =>
      //     a.rate.currencyTo.name.localeCompare(b.rate.currencyTo.name),
      //   sortDirections: ['ascend', 'descend', null],
      // },
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
      {
        name: 'Actions',
        sortOrder: null,
        sortFn: null,
        sortDirections: [null],
      },
    ];
  }

  protected onChangeStatus(
    cId: string | undefined,
    newStatus: ContractStatusEnum
  ) {
    if (!cId) return;
    this.paymentAPIService
      .updateContractStatus({
        contractId: cId,
        newStatus: newStatus,
      })
      .subscribe(() => {
        this.notificationService.showSuccess('Success');
        this._loadAllContracts();
      });
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
