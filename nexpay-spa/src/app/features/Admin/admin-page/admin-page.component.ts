import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Contract } from '../../../interfaces/contract.interface';

@Component({
  selector: 'admin-page',
  standalone: true,
  imports: [CommonModule],
  template: ` <h1>ADMIN</h1> `,
})
export class AdminPageComponent {
  protected contracts: Contract[] = [];
}
