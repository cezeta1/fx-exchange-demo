import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserLoginComponent } from '../user-profile/user-login/user-login.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, NzMenuModule, NzIconModule, UserLoginComponent],
  template: `
    <ul nz-menu nzMode="inline">
      <li nz-menu-item>
        <span nz-icon nzType="bank" nzTheme="fill"></span>
        <span>Contracts</span>
      </li>
      <li nz-menu-item>
        <span nz-icon nzType="control"></span>
        <span>Admin</span>
      </li>
    </ul>
  `,
})
export class SideMenuComponent {}
