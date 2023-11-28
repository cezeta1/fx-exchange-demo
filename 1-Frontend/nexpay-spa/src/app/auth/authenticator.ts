import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  ProtectedResourceScopes,
} from '@azure/msal-angular';
import {
  PublicClientApplication,
  InteractionType,
  EventMessage,
} from '@azure/msal-browser';
import { getClaimsFromStorage } from '../utils/storage-utils';
import { loginRequest, msalConfig, protectedResources } from './auth-config';
import { BehaviorSubject } from 'rxjs';

//* --- MSAL Instance Configuration --- *//

export const msalInstance = new PublicClientApplication(msalConfig);

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<
    string,
    Array<string | ProtectedResourceScopes> | null
  >();

  protectedResourceMap.set(protectedResources.nexPayBFF.endpoint, [
    {
      httpMethod: 'GET',
      scopes: [...protectedResources.nexPayBFF.scopes.read],
    },
    {
      httpMethod: 'POST',
      scopes: [...protectedResources.nexPayBFF.scopes.write],
    },
    {
      httpMethod: 'PUT',
      scopes: [...protectedResources.nexPayBFF.scopes.write],
    },
    {
      httpMethod: 'DELETE',
      scopes: [...protectedResources.nexPayBFF.scopes.write],
    },
  ]);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap,
    authRequest: (msalService, httpReq, originalAuthRequest) => {
      const resource = new URL(httpReq.url).hostname;
      let claim =
        msalService.instance.getActiveAccount()! &&
        getClaimsFromStorage(
          `cc.${msalConfig.auth.clientId}.${
            msalService.instance.getActiveAccount()?.idTokenClaims?.oid
          }.${resource}`
        )
          ? window.atob(
              getClaimsFromStorage(
                `cc.${msalConfig.auth.clientId}.${
                  msalService.instance.getActiveAccount()?.idTokenClaims?.oid
                }.${resource}`
              )
            )
          : undefined;
      return {
        ...originalAuthRequest,
        claims: claim,
        authority: `https://login.microsoftonline.com/${
          originalAuthRequest.account?.tenantId ?? 'organizations'
        }`,
      };
    },
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: loginRequest,
  };
}

const onLoginSuccessEmitter = new BehaviorSubject<EventMessage | null>(null);

/* ----------------------------------- */
var bearerToken!: string;
export const authenticator = {
  initialize: () => {
    msalInstance.initialize();
    // if (!msalInstance.getActiveAccount()) {
    //   console.log('NOT SIGNED IN!');
    //   msalInstance.loginRedirect();
    // }
  },
  signIn: async () => {
    await msalInstance
      .loginPopup(loginRequest)
      .then((response) => {
        if (response.account) {
          // TODO: this is not safe, use AcquireTokenSilent callback to get the token
          bearerToken = response.accessToken;
          debugger;
          msalInstance.setActiveAccount(response.account);
        }
        return msalInstance.getActiveAccount();
      })
      .catch((error) => console.log(error));
  },

  onLoginSuccess: onLoginSuccessEmitter.asObservable(),
  signOut: () => msalInstance.logoutPopup(),
  getCurrentAccount: () => msalInstance.getActiveAccount(),
  getCurrentUserId: () => msalInstance.getActiveAccount()?.localAccountId,
  isLoggedIn: () => (msalInstance.getActiveAccount() ? true : false),
  getToken: (): string => bearerToken,
};
