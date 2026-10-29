import { paths } from '@/config/paths';

export interface NavItem {
  label: string;
  href: string;
}

export const marketingNav: NavItem[] = [
  { label: 'Home', href: paths.home },
  { label: 'Pricing', href: paths.pricing },
  { label: 'Contact', href: paths.contact },
];

export const workspaceNav: NavItem[] = [{ label: 'Dashboard', href: paths.workspace.dashboard }];
