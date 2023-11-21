import { ContractStatus } from "./contract-status.interface";
import { Select } from "./select.interface";

export interface Contract {
    id?: string,
    
    status: ContractStatus,

    fromCurrency: Select,
    toCurrency: Select,
    exchangeRate: number,
    amount: number,

    createdOn: Date,
    expiredOn: Date,
    
    createdBy: string,
    createdByName: string,

    approvedBy: string,
    approvedByName: string
}