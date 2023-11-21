import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserLoginComponent } from '../user-profile/user-login/user-login.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';

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
        nz-menu-item
        *ngFor="let item of menuItems; index as i"
        (click)="onMenuRedirect(item)"
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
      route: 'contracts',
    },
    {
      id: 1,
      name: 'Admin',
      icon: 'control',
      route: 'admin',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  protected onMenuRedirect(item: MenuOption) {
    this.router.navigateByUrl(item.route);
  }
}
