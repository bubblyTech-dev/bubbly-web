'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, KeyRound, LogOut, User } from 'lucide-react';

import { paths } from '@/config/paths';
import { roleLabel } from '@/lib/auth/roles';
import { initials } from '@/lib/format';
import { useAuth } from '@/providers/AuthProvider';
import { useSnackbar } from '@/providers/SnackbarProvider';
import { ROLE } from '@/types/auth';

interface RoleSwitcherProps {
  /** Kept for the existing headers; the role shown always comes from the signed-in account. */
  currentRole?: 'principal' | 'teacher' | 'parent';
}

const profilePath: Record<number, string> = {
  [ROLE.PRINCIPAL]: paths.workspace.profile,
  [ROLE.TEACHER]: paths.teacher.profile,
  [ROLE.STUDENT]: paths.parent.profile,
};

/** The role badge next to the logo. Opens the account menu (profile, change password, log out). */
export function RoleSwitcher(_props: RoleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { me, logout } = useAuth();
  const snackbar = useSnackbar();
  if (!me) return null;

  const { user, school } = me;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50/90 px-2 py-0.5 text-[10px] font-semibold text-gray-800 shadow-2xs transition hover:bg-gray-100 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[11px]"
        title={`${user.name ?? user.email} · ${school.name}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 sm:h-2 sm:w-2" />
        <span>{roleLabel[user.role] ?? user.roleName}</span>
        <ChevronDown className="h-3 w-3 text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            role="menu"
            className="animate-in fade-in-50 zoom-in-95 absolute left-0 z-50 mt-2 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-xl"
          >
            <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                {initials(user.name ?? user.email)}
              </div>
              <div className="min-w-0">
                <div className="truncate text-xs font-bold text-gray-900">
                  {user.name ?? user.email}
                </div>
                <div className="truncate text-[10px] text-gray-500">{school.name}</div>
              </div>
            </div>
            <div className="my-1 border-t border-gray-100" />
            <Link
              role="menuitem"
              href={profilePath[user.role] ?? paths.workspace.profile}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
            >
              <User className="h-3.5 w-3.5" /> Profile
            </Link>
            <Link
              role="menuitem"
              href={paths.auth.changePassword}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
            >
              <KeyRound className="h-3.5 w-3.5" /> Change password
            </Link>
            <button
              role="menuitem"
              type="button"
              onClick={() => {
                setIsOpen(false);
                void logout().then(() => snackbar.info('You are logged out.'));
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50"
            >
              <LogOut className="h-3.5 w-3.5" /> Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
