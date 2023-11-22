import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
} from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: '7d84fb3b-9abd-4b66-99cd-2c736181538d', // Application (client) ID
    authority: 'b2b14dbf-506a-46ef-bc3b-f6c7897e3b8f', // Tenant ID
    redirectUri: 'http://localhost:4200/',
  },
  cache: {
    cacheLocation: 'localStorage',
  },
});

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', [
    'user.read',
  ]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
    loginFailedRoute: './login-failed',
  };
}

export const authenticator = {
  popupSignIn: () => {
    debugger;
    msalInstance
      .loginPopup()
      .then((result) => {
        console.log(result);
        debugger;
        // this.setLoginDisplay();
      })
      .catch((error) => console.log(error));
  },
  signOut: () => {
    debugger;
    msalInstance.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200',
    });
  },
  getCurrentUser: () => msalInstance.getActiveAccount()?.username,
  isLoggedIn: () => (msalInstance.getActiveAccount() ? true : false),
  getToken: (): string => {
    return 'TOKeEeEeEeEeEN';
  },
};
