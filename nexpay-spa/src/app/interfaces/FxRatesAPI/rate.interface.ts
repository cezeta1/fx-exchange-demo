import { Effectiveness } from '../Common/effectiveness.interface';
import { Currency } from './currency.interface';

export interface Rate extends Effectiveness {
  id: string;
  currencyFrom: Currency | undefined;
  currencyTo: Currency | undefined;
  exchangeRate: number;
}
