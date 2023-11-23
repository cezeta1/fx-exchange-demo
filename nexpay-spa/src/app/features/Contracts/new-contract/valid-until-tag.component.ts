import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'cz-valid-until-tag',
  standalone: true,
  imports: [CommonModule, NzTagModule],
  host: { ngSkipHydration: 'true' },
  template: `
    @if (expiredOn !== undefined) { @if (isValid) {
    <nz-tag nzColor="orange"
      >{{ customText ?? 'Valid until: ' }}
      {{ expiredOn | date : 'short' }}</nz-tag
    >
    } @else {
    <nz-tag nzColor="red">{{ customExpiredText ?? 'Expired' }}</nz-tag>
    } }
  `,
  styles: ``,
})
export class CZValidUntilTagComponent implements OnInit {
  @Input() expiredOn!: Date;
  @Input() customText: string | undefined;
  @Input() customExpiredText: string | undefined;

  constructor() {}

  ngOnInit(): void {}

  // Utils
  protected get isValid() {
    return new Date() < this.expiredOn;
  }
}
