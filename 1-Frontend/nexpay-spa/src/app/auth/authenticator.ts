import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  ProtectedResourceScopes,
} from '@azure/msal-angular';
import {
  PublicClientApplication,
  InteractionType,
  AccountInfo,
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
        // claims: claim,
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

const onLoginSuccessEmitter = new BehaviorSubject<AccountInfo | null>(null);

/* ----------------------------------- */
export const authenticator = {
  initialize: () => {
    return msalInstance.initialize();
  },
  handleSignIn: async () => {
    await msalInstance.handleRedirectPromise().then((response) => {
      if (response !== null) {
        if (response?.account) {
          msalInstance.setActiveAccount(response.account);
          onLoginSuccessEmitter.next(msalInstance.getActiveAccount());
        }
      } else {
        const currentAccounts = msalInstance.getAllAccounts();
        if (currentAccounts.length === 0) {
          msalInstance.loginRedirect(loginRequest);
        } else {
          // TODO add account selection if multiple accounts are available
          msalInstance.setActiveAccount(currentAccounts[0]);
          onLoginSuccessEmitter.next(msalInstance.getActiveAccount());
        }
      }
    });
  },
  onLoginSuccess: onLoginSuccessEmitter.asObservable(),
  signOut: () =>
    msalInstance.logoutRedirect({
      account: msalInstance.getActiveAccount(),
      authority: loginRequest?.authority ?? '',
    }),
  getCurrentAccount: () => msalInstance.getActiveAccount(),
  getCurrentUserId: () => msalInstance.getActiveAccount()?.localAccountId,
  isLoggedIn: () => (msalInstance.getActiveAccount() ? true : false),
  getToken: (): string =>
    msalInstance.getActiveAccount()?.idToken ?? 'No Token',
  getUserAuthority: (): UserAuthorityEnum => {
    const acc = msalInstance.getActiveAccount();
    return (
      (acc?.idTokenClaims?.roles?.some((r: string) => r.includes('Admin'))
        ? UserAuthorityEnum.Admin
        : UserAuthorityEnum.User) ?? undefined
    );
  },
};

export enum UserAuthorityEnum {
  Admin = 'admin',
  User = 'user',
}
