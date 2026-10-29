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
    inquiries: '/inquiries',
    fees: '/fees',
    classes: '/classes',
    leave: '/leave',
    teachers: '/teachers',
    calendar: '/calendar',
    chat: '/chat',
    profile: '/profile',
  },
} as const;
