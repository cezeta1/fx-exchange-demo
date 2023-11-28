// Angular
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// NgZorro
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
// Components
import { UserLoginComponent } from '../user-profile/user-login/user-login.component';
// Other
import { RoutesEnum } from '../../app.routes';

interface MenuOption {
  id: number;
  name: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, NzMenuModule, NzIconModule, UserLoginComponent],
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
  protected menuItems: MenuOption[] = [
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
    },
  ];
  protected currentSection: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // TODO: OnInit, implement route recognition, and select menu item accordingly
  }

  protected onMenuRedirect(item: MenuOption) {
    this.currentSection = item.id;
    this.router.navigateByUrl(item.route);
  }
}
