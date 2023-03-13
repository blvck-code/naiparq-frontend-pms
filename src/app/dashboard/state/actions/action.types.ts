export enum DashActionTypes {
  // Space Actions
  LOAD_SPACES = 'spaces/loadSpaces',
  LOAD_SPACES_SUCCESS = 'spaces/loadSpacesSuccess',
  LOAD_SPACES_FAIL = 'spaces/loadSpacesFail',

  // Organization
  LOAD_ORGANIZATION = 'organization/loadOrganization',
  LOAD_ORGANIZATION_SUCCESS = 'organization/loadOrganizationSuccess',
  LOAD_ORGANIZATION_FAIL = 'organization/loadOrganizationFail',
  SELECTED_SPACE_ID = 'organization/selectedSpaceId',

  // Billing
  LOAD_BILLINGS = 'billings/loadBillings',
  LOAD_BILLINGS_SUCCESS = 'billings/loadBillingsSuccess',
  LOAD_BILLINGS_FAIL = 'billings/loadBillingsFail',

  // Drive In
  LOAD_DRIVE_IN = 'driveIn/loadDriveIn',
  LOAD_DRIVE_IN_SUCCESS = 'driveIn/loadDriveInSuccess',
  LOAD_DRIVE_IN_FAIL = 'driveIn/loadDriveInFail',

  // Pagination
  LOAD_MORE_DRIVE_IN = 'driveIn/loadMoreDriveIn',
  LOAD_MORE_DRIVE_IN_SUCCESS = 'driveIn/loadMoreDriveInSuccess',
  LOAD_MORE_DRIVE_IN_FAIL = 'driveIn/loadMoreDriveInFail',

  // Drive Out
  LOAD_DRIVE_OUT = 'driveOut/loadDriveOut',
  LOAD_DRIVE_OUT_SUCCESS = 'driveOut/loadDriveOutSuccess',
  LOAD_DRIVE_OUT_FAIL = 'driveOut/loadDriveOutFail',

  // Assets
  LOAD_DEVICES = 'devices/loadDevices',
  LOAD_DEVICES_SUCCESS = 'devices/loadDevicesSuccess',
  LOAD_DEVICES_FAIL = 'devices/loadDevicesFail',
}
