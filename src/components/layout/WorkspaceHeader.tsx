'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { QuickAddModal } from '@/components/common/QuickAddModal';
import { NotificationsModal } from '@/components/common/NotificationsModal';
import { RoleSwitcher } from '@/components/common/RoleSwitcher';

export function WorkspaceHeader() {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-3 sm:px-6 lg:px-8">
          {/* Left: Brand Logo & Role Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Logo size="md" />
            <RoleSwitcher currentRole="principal" />
          </div>

          {/* Right: Notification Bell & Quick Add */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsNotificationsOpen(true)}
              aria-label="Notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-black/80 bg-white text-black transition-transform hover:scale-105 active:scale-95 sm:h-10 sm:w-10"
            >
              <Bell className="h-4 w-4 text-black sm:h-4.5 sm:w-4.5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white ring-2 ring-white sm:h-4.5 sm:w-4.5">
                2
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsQuickAddOpen(true)}
              className="flex items-center gap-1 rounded-full bg-black px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-transform hover:scale-105 hover:bg-gray-900 active:scale-95 sm:px-5 sm:py-2 sm:text-sm"
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
