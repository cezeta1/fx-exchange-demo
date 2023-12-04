import { ContractStatusEnum } from './contract-status.enum';
import { Effectiveness } from '../Common/effectiveness.interface';
import { AzureUser } from '../Common/user.interface';
import { Rate } from '../FxRatesAPI/rate.interface';

export interface Contract extends Effectiveness {
  id?: string;

  createdById: string;
  createdBy: AzureUser;

  approvedById?: string;
  approvedBy?: AzureUser;

  status: ContractStatusEnum;
  statusName: string;

  rateId: string;
  rate: Rate;

  amount: number;
  convertedAmount: number;
}
