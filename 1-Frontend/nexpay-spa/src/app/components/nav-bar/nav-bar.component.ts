// Angular
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// NgZorro
import { NzLayoutModule } from 'ng-zorro-antd/layout';
// Components
import { UserLoginComponent } from '../user-profile/user-login/user-login.component';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule, NzLayoutModule, UserLoginComponent],
  template: `
    <nz-header>
      <a href="./">
        <img
          class="cz-app-logo"
          src="../assets/icons/logo-white.png"
          alt="NexPay logo"
        />
      </a>
      <user-login class="cz-user-login-component"></user-login>
    </nz-header>
  `,
  styles: `
        .cz-app-logo {
            height: 100%;
            float: left;
            padding: 10px 0;
            margin-left: -25px;
        }
        .cz-user-login-component {
            float: right;
        }
    `,
})
export class NavBarComponent {}
