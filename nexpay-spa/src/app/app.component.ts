import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
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
export class AppComponent {}
