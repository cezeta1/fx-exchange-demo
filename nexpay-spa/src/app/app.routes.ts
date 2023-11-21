import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContractsPageComponent } from './features/Contracts/contracts-page/contracts-page.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'contracts'
      },
      {
        path: 'contracts',
        component: ContractsPageComponent,
        // canActivate: [authenticationGuard],
        data: {
          preload: true
        }
      }
];
