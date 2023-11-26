import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  ProtectedResourceScopes,
} from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { getClaimsFromStorage } from '../utils/storage-utils';
import { loginRequest, msalConfig, protectedResources } from './auth-config';

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

/* ----------------------------------- */
var bearerToken!: string;
export const authenticator = {
  initialize: () => msalInstance.initialize(),
  signIn: async () => {
    await msalInstance
      .loginPopup(loginRequest)
      .then((response) => {
        if (response.account) {
          msalInstance.setActiveAccount(response.account);
        }
        return msalInstance.getActiveAccount();
      })
      .catch((error) => console.log(error));
  },
  signOut: () => msalInstance.logoutPopup(),
  getCurrentAccount: () => msalInstance.getActiveAccount(),
  getCurrentUserId: () => msalInstance.getActiveAccount()?.localAccountId,
  isLoggedIn: () => (msalInstance.getActiveAccount() ? true : false),
  getToken: (): string => bearerToken,
};
