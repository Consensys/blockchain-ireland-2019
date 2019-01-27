export const ROUTES = {
  LOGIN:'/',
  EVENTS:'/event',
  OPERATOR: '/operator',
  JOURNEY: '/journey',
  DASHBOARD: '/dashboard',
  SETTLEMENT:'/settlement',
  SIMULATOR:'/simulator',
};

export const SERVER_ENDPOINT = 'http://localhost:3000';

export const ROLES = {
  ADMIN: 'admin',
  OPERATOR: 'operator'
};

export const USERS = {
  [ROLES.ADMIN]: 'admin1',
  [ROLES.OPERATOR]: 'operator1'
};