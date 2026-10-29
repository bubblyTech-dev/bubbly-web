'use client';

import { useState } from 'react';
import { Bell, ChevronDown, Check } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { QuickAddModal } from '@/components/common/QuickAddModal';
import { NotificationsModal } from '@/components/common/NotificationsModal';

export function WorkspaceHeader() {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'principal' | 'teacher' | 'parent'>('principal');

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Brand Logo & Role Badge */}
          <div className="flex items-center gap-3">
            <Logo size="md" />

            {/* Role Switcher preview for Principal, Teacher, Parent apps */}
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50/80 px-2.5 py-1 text-[11px] font-semibold text-gray-700 shadow-2xs transition hover:bg-gray-100"
                title="Switch role view (Principal, Teacher, Parent)"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="capitalize">
                  {selectedRole === 'principal' ? 'Principal Admin' : `${selectedRole} App`}
                </span>
                <ChevronDown className="h-3 w-3 text-gray-400" />
              </button>

              {isRoleDropdownOpen && (
                <div className="animate-in fade-in-50 zoom-in-95 absolute left-0 z-50 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                  <div className="px-2 py-1 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                    Bubbly App Roles
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('principal');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition ${
                      selectedRole === 'principal'
                        ? 'bg-black font-semibold text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>Principal Admin (Active)</span>
                    {selectedRole === 'principal' && <Check className="h-3.5 w-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('teacher');
                      setIsRoleDropdownOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs text-gray-500 transition hover:bg-gray-50"
                  >
                    <span>Teacher App</span>
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-medium text-gray-500">
                      Design flow ready
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('parent');
                      setIsRoleDropdownOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs text-gray-500 transition hover:bg-gray-50"
                  >
                    <span>Parent App</span>
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-medium text-gray-500">
                      Phase 2 flow
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Notification Bell & Quick Add */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsNotificationsOpen(true)}
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black/80 bg-white text-black transition-transform hover:scale-105 active:scale-95"
            >
              <Bell className="h-4.5 w-4.5 text-black" />
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white ring-2 ring-white">
                2
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsQuickAddOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white shadow-xs transition-transform hover:scale-105 hover:bg-gray-900 active:scale-95 sm:px-5 sm:text-sm"
            >
              <span className="text-base leading-none font-light">+</span>
              <span>Quick add</span>
            </button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <QuickAddModal isOpen={isQuickAddOpen} onClose={() => setIsQuickAddOpen(false)} />
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
}
