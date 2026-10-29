import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard', robots: { index: false } };

export default function DashboardPage() {
  return (
    <>
      <h1>Dashboard</h1>
      <p className="text-muted mt-3">Role-based dashboards (owner, teacher, student) go here.</p>
    </>
  );
}
