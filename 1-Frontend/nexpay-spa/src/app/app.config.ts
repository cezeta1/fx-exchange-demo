// Angular
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
// MSAL
import { MsalModule } from '@azure/msal-angular';
import { authInterceptorFn } from './auth/auth-interceptor';
import {
  MSALGuardConfigFactory,
  MSALInterceptorConfigFactory,
  msalInstance,
} from './auth/authenticator';
// Other
import { routes } from './app.routes';

/* --- NgZorro Configs --- */
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  BankFill,
  ControlFill,
  LinkedinFill,
  GithubFill,
  UserOutline,
} from '@ant-design/icons-angular/icons';
const ngZorroConfig: NzConfig = {
  notification: { nzPlacement: 'bottomLeft' },
};
const icons: IconDefinition[] = [
  BankFill,
  ControlFill,
  LinkedinFill,
  GithubFill,
  UserOutline,
];
/* ---------------- */

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { NzModalModule } from 'ng-zorro-antd/modal';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideNzI18n(en_US),
    provideHttpClient(withFetch(), withInterceptors([authInterceptorFn])),
    provideNzConfig(ngZorroConfig),
    importProvidersFrom(
      NzModalModule,
      NzIconModule.forRoot(icons),
      MsalModule.forRoot(
        msalInstance,
        MSALGuardConfigFactory(),
        MSALInterceptorConfigFactory()
      )
    ),
  ],
};
