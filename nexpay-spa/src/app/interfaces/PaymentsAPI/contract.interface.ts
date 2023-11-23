import { ContractStatus } from './contract-status.enum';
import { Currency } from '../FxRatesAPI/currency.interface';

export interface Contract {
  id?: string;

  status: ContractStatus;

  fromCurrency: Currency;
  toCurrency: Currency;
  exchangeRate: number;
  amount: number;
  convertedAmount: number;

  createdOn: Date;
  expiredOn: Date;

  createdBy: string;
  createdByName: string;

  approvedBy: string;
  approvedByName: string;
}
