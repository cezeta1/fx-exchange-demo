// Angular
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// NgZorro
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
// Components
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
// Other
import { authenticator } from './auth/authenticator';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NavBarComponent,
    SideMenuComponent,
    FooterComponent,
  ],
  template: `
    <nz-layout style="height: 100%;">
      <nav-bar></nav-bar>
      <nz-layout>
        <nz-sider nzWidth="220px" nzTheme="dark">
          <side-menu></side-menu>
        </nz-sider>
        <nz-layout>
          <div class="cz-main-content">
            <router-outlet></router-outlet>
          </div>
          <page-footer></page-footer>
        </nz-layout>
      </nz-layout>
    </nz-layout>
  `,
  styles: `
    .cz-main-content {
      height: 100%;
      padding: 10px 30px;
      overflow-y: auto;
    }
  `,
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    authenticator.initialize().then(() => {
      authenticator.handleSignIn();
    });
  }
}
