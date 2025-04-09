import { Effectiveness } from '../Common/effectiveness.interface';
import { Currency } from './currency.interface';

export interface Rate extends Effectiveness {
  id: string;
  currencyFrom: Currency;
  currencyTo: Currency;
  exchangeRate: number;
  amount: number;
}
