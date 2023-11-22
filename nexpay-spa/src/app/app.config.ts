import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';

/* --- NgZorro Configs --- */
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { NzIconModule } from 'ng-zorro-antd/icon';

const ngZorroConfig: NzConfig = {
  notification: { nzPlacement: 'bottomLeft' },
};

// import * as AllIcons from '@ant-design/icons-angular/icons';
// const antDesignIcons = AllIcons as {
//   [key: string]: IconDefinition;
// };
// NzIconModule.forRoot(Object.values(antDesignIcons)),
import {
  BankFill,
  ControlFill,
  LinkedinFill,
  GithubFill,
} from '@ant-design/icons-angular/icons';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
const icons: IconDefinition[] = [
  BankFill,
  ControlFill,
  LinkedinFill,
  GithubFill,
];
/* ---------------- */

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
    // withInterceptors()
    provideNzConfig(ngZorroConfig),
    importProvidersFrom(NzIconModule.forRoot(icons)),
  ],
};
