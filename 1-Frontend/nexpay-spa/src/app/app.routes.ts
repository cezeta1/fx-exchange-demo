import { Routes } from '@angular/router';
import { ContractsPageComponent } from './features/Contracts/contracts-page/contracts-page.component';
import { AdminPageComponent } from './features/Admin/admin-page/admin-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MsalGuard } from '@azure/msal-angular';

export enum RoutesEnum {
  Contracts = 'contracts',
  Admin = 'admin',
}

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'contracts',
  },
  {
    path: RoutesEnum.Contracts,
    component: ContractsPageComponent,
    canActivate: [MsalGuard],
  },
  {
    path: RoutesEnum.Admin,
    component: AdminPageComponent,
    canActivate: [MsalGuard],
  },
  { path: '**', component: NotFoundComponent },
];
