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
import { provideHttpClient, withFetch } from '@angular/common/http';
const icons: IconDefinition[] = [
  BankFill,
  ControlFill,
  LinkedinFill,
  GithubFill,
];
/* ---------------- */

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    // withInterceptors()
    provideNzConfig(ngZorroConfig),
    provideNzI18n(en_US),
    importProvidersFrom(NzIconModule.forRoot(icons)),
  ],
};
