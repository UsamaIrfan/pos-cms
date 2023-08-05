import { ACCOUNT_TYPES, ITEM_TYPES } from './enums';

export const LIMIT = 10;
export const TOKEN = 'token';
export const PERMISSIONS = 'permissions';
export const AUTH_CRED = 'AUTH_CRED';
export const AUTH_TOKEN = 'AUTH_TOKEN';
export const OFFICE_SWIMLANE_USER = 'OFFICE_SWIMLANE_USER';
export const DATE_FORMAT = 'YYYY-MM-DD';

export const ROLES = Object.freeze({
  USER: 'USER',
  COMPANY_OWNER: 'COMPANY_OWNER',
  COMPANY_STAFF: 'COMPANY_STAFF',
});

export const unitOptions = [
  {
    label: 'KG',
    value: 'kg',
  },
  {
    label: 'Liters',
    value: 'liters',
  },
  {
    label: 'Grams',
    value: 'grams',
  },
  {
    label: 'CM',
    value: 'centimeters',
  },
  {
    label: 'Inches',
    value: 'inches',
  },
  {
    label: 'Watts',
    value: 'watts',
  },
  {
    label: 'CM Square',
    value: 'cm-square',
  },
  {
    label: 'Yards',
    value: 'yards',
  },
];

export const accountTypeOptions = [
  {
    label: 'Inventory Account',
    value: ACCOUNT_TYPES.INVENTORY,
  },
  {
    label: 'Asset Account',
    value: ACCOUNT_TYPES.ASSET,
  },
  {
    label: 'Liability Account',
    value: ACCOUNT_TYPES.LIABILITY,
  },
  {
    label: 'Capital Account',
    value: ACCOUNT_TYPES.CAPITAL,
  },
  {
    label: 'Depreciation Account',
    value: ACCOUNT_TYPES.DEPRECIATION,
  },
  {
    label: 'Loss Account',
    value: ACCOUNT_TYPES.LOSS,
  },
  {
    label: 'Revenue Account',
    value: ACCOUNT_TYPES.REVENUE,
  },
];

export const itemTypeOptions = [
  {
    label: 'Debit',
    value: ITEM_TYPES.DEBIT,
  },
  {
    label: 'Credit',
    value: ITEM_TYPES.CREDIT,
  },
];
