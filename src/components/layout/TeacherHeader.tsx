'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Plus, BookOpen, CalendarOff } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { RoleSwitcher } from '@/components/common/RoleSwitcher';
import { NotificationsModal } from '@/components/common/NotificationsModal';
import { paths } from '@/config/paths';

export function TeacherHeader() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-3 sm:px-6 lg:px-8">
          {/* Left: Brand Logo & Role Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Logo size="md" />
            <RoleSwitcher currentRole="teacher" />
          </div>

          {/* Right: Notification Bell & Quick Add (Matching Figma Screenshot 1) */}
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

            {/* + Quick add Dropdown with 'Add Home work' and 'Add leave' */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
                className="flex items-center gap-1.5 rounded-full bg-black px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-gray-800 active:scale-95 sm:px-5 sm:py-2 sm:text-sm"
              >
                <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Quick add</span>
              </button>

              {isQuickMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsQuickMenuOpen(false)} />
                  <div className="animate-in fade-in-50 zoom-in-95 absolute right-0 z-50 mt-2 w-48 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                    <Link
                      href={paths.teacher.homework}
                      onClick={() => setIsQuickMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 transition hover:bg-gray-50 hover:text-black"
                    >
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <span>Add Home work</span>
                    </Link>

                    <Link
                      href={paths.teacher.leave}
                      onClick={() => setIsQuickMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 transition hover:bg-gray-50 hover:text-black"
                    >
                      <CalendarOff className="h-4 w-4 text-gray-500" />
                      <span>Add leave</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Drawer */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
}
