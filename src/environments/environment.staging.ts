// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseURL: string = 'https://staging.naiparq.co.ke:444';
const version: string = '/api/v2/';
const naiparqBaseURL: string = baseURL + version;
// const naiparqBaseURL = 'https://192.168.0.61:444z/api/v1/';
const naiparqWsURL = '';

export const environment = {
  production: true,

  // Accounts Module URLS
  naiparqLogin: naiparqBaseURL + 'accounts/login/',
  naiparqRegister: naiparqBaseURL + 'accounts/register/',
  naiparqLogout: naiparqBaseURL + 'accounts/logout',
  naiparqProfile: naiparqBaseURL + 'accounts/users/',

  // Spaces
  naiparqListSpaces: naiparqBaseURL + 'spaces/space',

  // Drive In Module URLS
  naiparqDriveIn: naiparqBaseURL + 'spaces/drive/in',

  // Drive Out Model URLS
  naiparqDriveOut: naiparqBaseURL + 'spaces/drive/out',

  // Billing Module URLS
  naiparqBillingList: naiparqBaseURL + 'bill/billings',
  naiparqCheckout: naiparqBaseURL + 'bill/checkout',

  // Pricing Module URLS

  // Device Module URLS
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.