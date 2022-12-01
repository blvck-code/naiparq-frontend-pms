// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const naiparqBaseURL = 'http://192.168.0.61:444/api/v1/';
const naiparqWsURL = '';

export const environment = {
  production: false,

  // Accounts Module URLS
  naiparqLogin: naiparqBaseURL + 'accounts/login/',
  naiparqRegister: naiparqBaseURL + 'accounts/register/',
  naiparqLogout: naiparqBaseURL + 'accounts/logout/'


  // Drive In Module URLS

  // Billing Module URLS

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
