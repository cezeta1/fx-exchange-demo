// Angular
import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
// NgZorro
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'cz-valid-until-tag',
  imports: [CommonModule, NzTagModule],
  host: { ngSkipHydration: 'true' },
  template: `
    @if (expiredOn !== undefined) { @if (isValid) {
    <nz-tag nzColor="orange"
      >{{ customText() ?? 'Valid until: ' }}
      {{ expiredOn() | date : 'short' }}</nz-tag
    >
    } @else {
    <nz-tag nzColor="red">{{ customExpiredText() ?? 'Expired' }}</nz-tag>
    } }
  `,
  styles: ``,
})
export class CZValidUntilTagComponent {
  // Inputs
  public expiredOn = input<Date>();
  public customText = input<string>();
  public customExpiredText = input<string>(); 

  // Utils
  protected get isValid() {
    return new Date() < new Date(this.expiredOn() ?? '');
  }
}
