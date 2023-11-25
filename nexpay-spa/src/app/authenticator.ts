import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
} from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';

/* --- MSAL Instance Configuration --- */
export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: '7d84fb3b-9abd-4b66-99cd-2c736181538d', // Application (client) ID
    authority: 'b2b14dbf-506a-46ef-bc3b-f6c7897e3b8f', // Tenant ID
    redirectUri: 'http://localhost:4200/',
  },
  cache: {
    cacheLocation: 'localStorage',
  },
  system: {
    allowNativeBroker: false, // Disables native brokering support
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
/* ----------------------------------- */

const loginRequest = {
  scopes: ['User.Read'],
};
const tokenRequest = {
  scopes: ['User.Read', 'Mail.Read'],
  forceRefresh: false, // Set this to "true" to skip a cached token and go to the server to get a new token
};
const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
  graphMailEndpoint: 'https://graph.microsoft.com/v1.0/me/messages',
};

export const authenticator = {
  initialize: () => {
    msalInstance.initialize().then((data) => {
      console.log('initialized!');
    });
  },
  popupSignIn: async () => {
    await msalInstance
      .loginPopup(loginRequest)
      .then((result) => {
        console.log(result);
        // this.setLoginDisplay();
      })
      .catch((error) => console.log(error));
  },
  signOut: () => {
    msalInstance.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200',
    });
  },
  getCurrentUser: () => msalInstance.getActiveAccount()?.username,
  getCurrentUserId: () => '29de8b07-4750-4ad0-a43e-f9c5ed493f53',
  isLoggedIn: () => (msalInstance.getActiveAccount() ? true : false),
  getToken: (): string => {
    return 'TOKeEeEeEeEeEN';
  },
};
