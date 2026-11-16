import { paths } from '@/config/paths';
import { ROLE, type Role } from '@/types/auth';

/** Where each role lands after login. */
export function homeFor(role: Role | number | undefined): string {
  if (role === ROLE.TEACHER) return paths.teacher.dashboard;
  if (role === ROLE.STUDENT) return paths.parent.dashboard;
  return paths.workspace.dashboard;
}

export const roleLabel: Record<number, string> = {
  [ROLE.PRINCIPAL]: 'Principal Admin',
  [ROLE.TEACHER]: 'Teacher App',
  [ROLE.STUDENT]: 'Parent App',
};

/** Only follow a ?next= that is a path inside this app. */
export function safeNext(next: string | null | undefined): string | null {
  if (!next || !next.startsWith('/') || next.startsWith('//')) return null;
  return next;
}
