import { ContractStatusEnum } from './contract-status.enum';
import { Currency } from '../FxRatesAPI/currency.interface';
import { Effectiveness } from '../Common/effectiveness.interface';

export interface Contract extends Effectiveness {
  id?: string;

  status: ContractStatusEnum;

  fromCurrency: Currency;
  toCurrency: Currency;
  exchangeRate: number;
  amount: number;
  convertedAmount: number;

  createdBy: string;
  createdByName: string;

  approvedBy: string;
  approvedByName: string;
}
