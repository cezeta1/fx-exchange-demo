import { Routes } from '@angular/router';
import { ContractsPageComponent } from './features/Contracts/contracts-page/contracts-page.component';
import { AdminPageComponent } from './features/Admin/admin-page/admin-page.component';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'contracts',
  },
  {
    path: 'contracts',
    component: ContractsPageComponent,
    // canActivate: [MsalGuard],
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    // canActivate: [MsalGuard],
  },
];
