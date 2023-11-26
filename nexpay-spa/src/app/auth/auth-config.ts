import {
  BrowserCacheLocation,
  Configuration,
  LogLevel,
  PopupRequest,
  RedirectRequest,
} from '@azure/msal-browser';

//* --- Msal Configs --- *//

export const msalConfig: Configuration = {
  auth: {
    clientId: 'f648ff3f-ca7c-4189-b4d0-3f9dc0ce88ea', // This is the ONLY mandatory field that you need to supply.
    authority: 'https://login.microsoftonline.com/organizations', // Defaults to "https://login.microsoftonline.com/common"
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
    clientCapabilities: ['CP1'], // This lets the resource server know that this client can handle claim challenges.
  },
  cache: {
    cacheLocation: BrowserCacheLocation.SessionStorage,
  },
  system: {
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false,
    },
  },
};

/*
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
  nexPayBFF: {
    endpoint: 'https://localhost:7000/api/',
    scopes: {
      read: ['api://36d3a9c4-77cc-4670-8df4-e30b2df9a160/NexPayBFF.Read'],
      write: ['api://36d3a9c4-77cc-4670-8df4-e30b2df9a160/NexPayBFF.ReadWrite'],
    },
  },
};

/*
 * Scopes you add here will be prompted for consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest: PopupRequest | RedirectRequest = {
  scopes: ['User.Read'],
};
