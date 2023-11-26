import { ContractStatusEnum } from './contract-status.enum';
import { Currency } from '../FxRatesAPI/currency.interface';
import { Effectiveness } from '../Common/effectiveness.interface';
import { User } from '../Common/user.interface';
import { Rate } from '../FxRatesAPI/rate.interface';

export interface Contract extends Effectiveness {
  id?: string;
  userId: string;
  user: User;

  status: ContractStatusEnum;
  statusName: string;

  rateId: string;
  rate: Rate;

  amount: number;
  convertedAmount: number;
  // createdBy: string;
  // createdByName: string;

  // approvedBy: string;
  // approvedByName: string;
}
