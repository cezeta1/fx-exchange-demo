import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';

/* --- NgZorro Configs --- */
const ngZorroConfig: NzConfig = {
  notification: { nzPlacement: 'bottomLeft' },
};

import { NzIconModule } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
/* ---------------- */

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideNzConfig(ngZorroConfig),
    importProvidersFrom(NzIconModule.forRoot(Object.values(antDesignIcons))),
  ],
};
