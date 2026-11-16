import type { Metadata } from 'next';

import { PrincipalDashboard } from '@/features/dashboard/PrincipalDashboard';

export const metadata: Metadata = {
  title: 'Principal Dashboard',
  description: 'Preschool administration dashboard for Bubbly Principal Admin',
};

export default function DashboardPage() {
  return <PrincipalDashboard />;
}
