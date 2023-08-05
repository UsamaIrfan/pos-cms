export const REDUCER_PATHS = {
  user: 'user',
  masterAccount: 'masterAccount',
  itemAccount: 'itemAccount',
  order: 'order',
  sectionItems: 'sectionItems',
  company: 'company',
};

export const SERVICE_TAGS = Object.freeze({
  USER: 'USER',
  MASTER_ACCOUNT: 'MASTER_ACCOUNT',
  ITEM_ACCOUNT: 'ITEM_ACCOUNT',
  ORDER: 'ORDER',
  SECTION_ITEMS: 'SECTION_ITEMS',
  COMPANY: 'COMPANY',
});

export const ACCOUNT_TYPES = Object.freeze({
  LIABILITY: 'LIABILITY',
  REVENUE: 'REVENUE',
  ASSET: 'ASSET',
  LOSS: 'LOSS',
  CAPITAL: 'CAPITAL',
  DEPRECIATION: 'DEPRECIATION',
  INVENTORY: 'INVENTORY',
});

export const ITEM_TYPES = Object.freeze({
  DEBIT: 'DEBIT',
  CREDIT: 'CREDIT',
});

export const THEME_OPTIONS = Object.freeze({ DARK: 'DARK', LIGHT: 'LIGHT' });
