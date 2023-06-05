import SSRCookie from 'cookie';
import Cookie from 'js-cookie';

import { AUTH_CRED, AUTH_TOKEN, PERMISSIONS, ROLES, TOKEN } from './constants';

export const allowedRoles = [
  ROLES.USER,
  ROLES.COMPANY_OWNER,
  ROLES.COMPANY_STAFF
];

export function setAuthCredentials(token, permissions, user) {
  Cookie.set(AUTH_CRED, JSON.stringify({ token, permissions, user }));
}

export function setAuthToken(token) {
  Cookie.set(AUTH_TOKEN, JSON.stringify({ token }));
}

export function getAuthToken() {
  const token = Cookie.get(AUTH_TOKEN);
  if (token) {
    return JSON.parse(token);
  }
  return { token: null };
}

export function getAuthCredentials(context) {
  let authCred;
  if (context) {
    authCred = parseSSRCookie(context)[AUTH_CRED];
  } else {
    authCred = Cookie.get(AUTH_CRED);
  }
  if (authCred) {
    return JSON.parse(authCred);
  }
  return { token: null, permissions: null };
}

export function parseSSRCookie(context) {
  return SSRCookie.parse(context.req.headers.cookie ?? '');
}

export function hasAccess(_allowedRoles, _userPermissions) {
  if (_userPermissions) {
    return Boolean(
      _allowedRoles?.find((aRole) => _userPermissions.includes(aRole))
    );
  }
  return false;
}
export function isAuthenticated(_cookies) {
  return (
    !!_cookies[TOKEN] &&
    Array.isArray(_cookies[PERMISSIONS]) &&
    !!_cookies[PERMISSIONS].length
  );
}
