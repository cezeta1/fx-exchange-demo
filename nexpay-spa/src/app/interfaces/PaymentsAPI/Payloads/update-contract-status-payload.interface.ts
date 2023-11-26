import { ContractStatusEnum } from '../contract-status.enum';

export interface UpdateContractStatusPayload {
  contractId: string;
  newStatus: ContractStatusEnum;
}
