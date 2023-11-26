import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'cz-tag',
  standalone: true,
  imports: [CommonModule, NzTagModule],
  template: `<nz-tag [nzColor]="type ?? 'default'">{{ text }}</nz-tag>`,
})
export class CZTagComponent {
  @Input() type: 'success' | 'error' | 'warning' | null = null;
  @Input() text: string = '';

  constructor() {}
}
