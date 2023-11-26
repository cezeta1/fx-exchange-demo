import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { authenticator } from '../../../auth/authenticator';
import { AccountInfo } from '@azure/msal-browser';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'user-login',
  standalone: true,
  imports: [
    CommonModule,
    NzAvatarModule,
    NzDropDownModule,
    NzDividerModule,
    NzButtonModule,
  ],
  template: `
    @if (authenticator.isLoggedIn()) {
    <a
      nz-dropdown
      nzTrigger="click"
      [nzDropdownMenu]="menu"
      nzPlacement="bottomRight"
      nzOverlayClassName="cz-profile-menu"
    >
      <nz-avatar [nzText]="currentUser.initials" [nzSize]="42"></nz-avatar>
    </a>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu nzSelectable>
        <li>
          <div style="display:flex; flex-direction: column; margin: 5px 15px">
            <span class="cz-label">User Id</span>
            <span class="cz-value">{{ currentUser.id }}</span>
            <nz-divider class="cz-divider"></nz-divider>
            <span class="cz-label">UserName</span>
            <span class="cz-value">{{ currentUser.fullName }}</span>
            <nz-divider class="cz-divider"></nz-divider>
            <span class="cz-label">Tenant Id</span>
            <span class="cz-value">{{ currentUser.tenantId }}</span>
          </div>
        </li>
        <li nz-menu-divider></li>
        <li nz-menu-item (click)="onLogout()">Logout</li>
      </ul>
    </nz-dropdown-menu>
    } @else {
    <button nz-button nzType="primary" (click)="onLogin()">Login</button>
    }
  `,
  styles: `
    ::ng-deep .cz-profile-menu {
        width: 200px;
        margin-top: 25px
    }
    .cz-label {
      margin-bottom: 5px;
      font-weight: bold;
    }
    .cz-value {
      font-size: x-small;
    }
    .cz-divider {
      margin: 10px 0;
    }
  `,
})
export class UserLoginComponent {
  protected authenticator = authenticator;
  protected currentUser: any = {};

  constructor() {}

  ngOnInit() {
    if (authenticator.isLoggedIn()) this._fillInUserData();
  }

  protected onLogin(): void {
    authenticator.signIn().then(() => this._fillInUserData());
  }
  protected onLogout(): void {
    authenticator.signOut();
  }

  private _fillInUserData(): void {
    const acc: AccountInfo | null = authenticator.getCurrentAccount();
    this.currentUser = {
      id: acc?.localAccountId ?? '-',
      fullName: acc?.name ?? '-',
      initials: this._getUserInitials(acc?.name) ?? '-',
      tenantId: acc?.tenantId ?? '-',
    };
  }
  private _getUserInitials(username?: string): string {
    return username ?? '-';
  }
}
