import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { authenticator, msalInstance } from '../../../authenticator';

@Component({
  selector: 'user-login',
  standalone: true,
  imports: [CommonModule, NzAvatarModule, NzDropDownModule, NzButtonModule],
  template: `
    @if (isLoggedIn) {
    <a
      nz-dropdown
      nzTrigger="click"
      [nzDropdownMenu]="menu"
      nzPlacement="bottomRight"
      nzOverlayClassName="cz-profile-menu"
    >
      <nz-avatar [nzText]="user.initials" [nzSize]="42"></nz-avatar>
    </a>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu nzSelectable>
        <li nz-menu-item (click)="onLogout()">Logout</li>
      </ul>
    </nz-dropdown-menu>
    } @else {
    <button nz-button nzType="primary" (click)="onLogin()">Login</button>
    }
  `,
  styles: `
     ::ng-deep .cz-profile-menu {
        width: 150px;
        margin-top: 25px
    }
  `,
})
export class UserLoginComponent implements OnInit {
  protected isLoggedIn: boolean = false;
  protected user: any = {
    initials: 'JC',
  };

  constructor() {}

  ngOnInit(): void {
    msalInstance.initialize();
  }

  protected onLogin(): void {
    this.isLoggedIn = true;
    authenticator.popupSignIn();
  }
  protected onLogout(): void {
    this.isLoggedIn = false;
  }
}
