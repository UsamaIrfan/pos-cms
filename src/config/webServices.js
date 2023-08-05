//auth
export const developmentServerUrl = 'http://localhost:8000';
export const baseUrl = 'http://localhost:8000';
export const API = '/api/v1';

//auth
export const API_LOGIN = `${API}/auth/login`;
export const API_REGISTER = `${API}/auth/register`;
export const API_VERIFY_EMAIL = `${API}/auth/verify-email`;
export const API_VERIFY_EMAIL_RESEND = `${API}/auth/verify-email/resend`;
export const API_FORGOT_PASSWORD = `${API}/auth/forgot-password`;
export const API_FORGOT_PASSWORD_VERIFY = `${API}/auth/verify-forgot`;
export const API_RESET_PASSWORD = `${API}/auth/reset-password`;
export const API_CHANGE_PASSWORD = `${API}/auth/change-password`;

// Master Accounts
export const API_MASTER_ACCOUNT = `${API}/master-account`;

// Company
export const API_COMPANY = `${API}/company`;

// Accounts (Items)
export const API_ITEM_ACCOUNT = `${API}/account`;

// Orders
export const API_ORDER = `${API}/order`;

// Order Items
export const API_ORDER_ITEMS = `${API}/order-item`;
