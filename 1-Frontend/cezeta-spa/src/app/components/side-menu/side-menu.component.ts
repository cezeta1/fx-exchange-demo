// Angular
import { CommonModule } from '@angular/common';
import { Component, inject, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// NgZorro
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
// Components
// Other
import { RoutesEnum } from '../../app.routes';
import { authenticator, UserAuthorityEnum } from '../../auth/authenticator';
import { cz_takeUntilDestroyed } from '../../utils/utils';

interface MenuOption {
  id: number;
  name: string;
  icon: string;
  route: string;
  needsAdmin?: boolean;
}

@Component({
  selector: 'side-menu',
  imports: [
    CommonModule,
    NzMenuModule,
    NzIconModule
  ],
  template: `
    <ul nz-menu nzMode="inline">
      <li
        *ngFor="let item of menuItems; index as i"
        nz-menu-item
        (click)="onMenuRedirect(item)"
        [nzSelected]="currentSection === item.id"
      >
        <span nz-icon [nzType]="item.icon" nzTheme="fill"></span>
        <span>{{ item.name }} </span>
      </li>
    </ul>
  `,
})
export class SideMenuComponent implements OnInit {

  private _inj = inject(Injector);
  private _router = inject(Router);

  protected allMenuItems: MenuOption[] = [
    {
      id: 0,
      name: 'Contracts',
      icon: 'bank',
      route: RoutesEnum.Contracts,
    },
    {
      id: 1,
      name: 'Admin',
      icon: 'control',
      route: RoutesEnum.Admin,
      needsAdmin: true,
    },
  ];
  
  protected menuItems: MenuOption[] = [];
  protected currentSection: number = 0;

  ngOnInit() {
    // TODO: OnInit, implement route recognition, and select menu item accordingly
    authenticator.onLoginSuccess
      .pipe(cz_takeUntilDestroyed(this._inj))
      .subscribe(() => {
        this.menuItems = (authenticator.getUserAuthority() === UserAuthorityEnum.User) 
          ? [...this.allMenuItems.filter((mI) => !mI.needsAdmin)]
          : [...this.allMenuItems];     
      });
  }

  protected onMenuRedirect(item: MenuOption) {
    this.currentSection = item.id;
    this._router.navigateByUrl(item.route);
  }
}
