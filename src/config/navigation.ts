import { paths } from '@/config/paths';

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export const marketingNav: NavItem[] = [
  { label: 'Home', href: paths.home },
  { label: 'Pricing', href: paths.pricing },
  { label: 'Contact', href: paths.contact },
];

export const workspaceNav: NavItem[] = [
  { label: 'Home', href: paths.workspace.dashboard, icon: 'Home' },
  { label: 'Class', href: paths.workspace.classes, icon: 'GraduationCap' },
  { label: 'Teacher', href: paths.workspace.teachers, icon: 'Users' },
  { label: 'Chat', href: paths.workspace.chat, icon: 'MessageSquare' },
  { label: 'Profile', href: paths.workspace.profile, icon: 'User' },
];
