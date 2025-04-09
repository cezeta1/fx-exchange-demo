// Angular
import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
// NgZorro
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'cz-tag',
  imports: [CommonModule, NzTagModule],
  template: `<nz-tag [nzColor]="type() ?? 'default'">{{ text() }}</nz-tag>`,
})
export class CZTagComponent {
  public type = input<'success' | 'error' | 'warning' | null>(null);
  public text = input<string>('');
}
