// Angular
import { CommonModule } from '@angular/common';
import { Component, inject, Injector } from '@angular/core';
// NgZorro
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
// MSAL
import { AccountInfo } from '@azure/msal-browser';
// Other
import { authenticator } from '../../../auth/authenticator';
import { cz_takeUntilDestroyed } from '../../../utils/utils';

@Component({
  selector: 'user-login',
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
      <nz-avatar [nzSize]="42" nzIcon="user"></nz-avatar>
      <span nz-icon nzType="user" nzTheme="outline"></span>
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
  private _inj = inject(Injector);

  protected authenticator = authenticator;
  protected currentUser: any = {};

  ngOnInit() {
    if (authenticator.isLoggedIn()) 
      this._fillInUserData();
    else
      authenticator.onLoginSuccess
        .pipe(cz_takeUntilDestroyed(this._inj))
        .subscribe(
          (currentUser: AccountInfo | null) => {
            if (currentUser)
              this._fillInUserData(currentUser);
          }
        );
  }

  protected onLogout(): void {
    authenticator.signOut();
  }

  private _fillInUserData(currentUser?: AccountInfo | null): void {
    if (!currentUser) currentUser = authenticator.getCurrentAccount();
    this.currentUser = {
      id: currentUser?.localAccountId ?? '-',
      fullName: currentUser?.name ?? '-',
      initials: this._getUserInitials(currentUser?.name) ?? '-',
      tenantId: currentUser?.tenantId ?? '-',
    };
  }

  private _getUserInitials = (username?: string): string | null => 
    ((username ?? '')
      .replace('.', ' ')
      .match(/(^\S\S?|\s\S)?/g)
      ?.map((v) => v.trim())
      .join('')
      .match(/(^\S|\S$)?/g)
      ?.join('')
      .toLocaleUpperCase() ?? 'NN'
    );
}
