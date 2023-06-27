// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseURL: string = 'https://pms.naiparq.co.ke:444';
const version: string = '/api/v2/';
const naiparqBaseURL: string = baseURL + version;
// const naiparqBaseURL = 'https://192.168.0.61:444z/api/v1/';
const naiparqWsURL = '';

export const environment = {
  production: true,
  mapbox: {
    accessToken:
      'pk.eyJ1IjoiYmx2Y2tkZXgiLCJhIjoiY2xlcGk4aXB0MDRkeDQxb2VwamJpbnd3NyJ9.-IlY_PVl-BYsWx-coGTk-g',
  },

  // Accounts Module URLS
  naiparqLogin: naiparqBaseURL + 'accounts/login/',
  naiparqRegister: naiparqBaseURL + 'accounts/register/',
  naiparqLogout: naiparqBaseURL + 'accounts/logout',
  naiparqProfile: naiparqBaseURL + 'accounts/users/',
  naiparqResetPass: naiparqBaseURL + 'accounts/password/reset/request/',

  // Create users
  naiparqCreateBlogger: naiparqBaseURL + 'accounts/register/blogger/',
  naiparqCreateAttendant: naiparqBaseURL + 'accounts/register/attendant/',
  naiparqUsers: naiparqBaseURL + 'accounts/users/',

  // Contact Us
  naiparqContactUs: naiparqBaseURL + 'accounts/contact/us/',

  // Spaces
  naiparqListSpaces: naiparqBaseURL + 'spaces/space',
  naiparqCreateSpace: naiparqBaseURL + 'spaces/space/',

  // Space Images
  naiparqGallery: naiparqBaseURL + 'spaces/gallery/',

  // Organization
  naiparqCreateOrg: naiparqBaseURL + 'guest/org/',
  naiparqOrgList: naiparqBaseURL + 'guest/org',

  // Whitelist
  naiparqCreateWhiteList: naiparqBaseURL + 'guest/guest/',

  // Drive In Module URLS
  naiparqDriveIn: naiparqBaseURL + 'spaces/drive/in',

  // Drive Out Model URLS
  naiparqDriveOut: naiparqBaseURL + 'spaces/drive/out',
  naiparqGuestDriveOut: naiparqBaseURL + 'guest/drive/out',

  // Billing Module URLS
  naiparqBillingList: naiparqBaseURL + 'bill/billings',
  naiparqCheckout: naiparqBaseURL + 'bill/checkout',

  // Pricing Module URLS
  naiparqCreatePricing: naiparqBaseURL + 'spaces/spacepricing/',
  naiparqCreatePriceSchedule: naiparqBaseURL + 'spaces/priceschedule/',

  // Device Module URLS
  naiparqCreateDevice: naiparqBaseURL + 'asset/device/',
  naiparqDevicesList: naiparqBaseURL + 'asset/device',

  // Naiparq Blog
  naiparqCreateBlog: naiparqBaseURL + 'blog/article/',
  naiparqBlogList: naiparqBaseURL + 'blog/article',
  naiparqCompanyList: naiparqBaseURL + 'blog/company',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
