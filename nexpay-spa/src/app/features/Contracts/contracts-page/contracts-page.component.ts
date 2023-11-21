import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Contract } from "../../../interfaces/contract.interface";

@Component({
    selector: 'contracts-page',
    standalone: true,
    imports: [CommonModule],
    template: `
        <h1>CONTRACTS</h1>
    `,
})
export class ContractsPageComponent {
    protected contracts: Contract[] = [];
}
