import { Currency } from '../../FxRatesAPI/currency.interface';
import { Rate } from '../../FxRatesAPI/rate.interface';

export interface CreateContractPayload {
  rate: Rate;
  amount: number;
  createdBy: string;
}
