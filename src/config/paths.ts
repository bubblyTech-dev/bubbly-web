/** All route URLs live here. Never hard-code paths in components. */
export const paths = {
  home: '/',
  pricing: '/pricing',
  contact: '/contact',
  auth: {
    login: '/login',
    register: '/register',
  },
  workspace: {
    dashboard: '/dashboard',
  },
} as const;
