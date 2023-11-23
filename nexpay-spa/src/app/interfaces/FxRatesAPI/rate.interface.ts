import { Currency } from './currency.interface';

export interface Rate {
  id: string;
  currencyFrom: Currency | undefined;
  currencyTo: Currency | undefined;
  exchangeRate: number;

  quotedOn: Date;
  expiredOn: Date;
}
