import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'user-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzMenuModule,
    NzIconModule,
  ],
  template: `
    <ul nz-menu nzTheme="dark" nzMode="horizontal" style="float: right;">
      <li nz-menu-item>Login</li>
    </ul>
  `,
  styles: ` `
})
export class UserLoginComponent {}
