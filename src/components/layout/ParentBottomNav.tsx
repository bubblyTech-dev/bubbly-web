'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, MessageSquare, User } from 'lucide-react';
import { paths } from '@/config/paths';

export function ParentBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Home',
      href: paths.parent.dashboard,
      icon: Home,
      isActive:
        pathname === paths.parent.dashboard ||
        pathname === paths.parent.calendar ||
        pathname === paths.parent.attendance ||
        pathname === paths.parent.leave ||
        pathname === paths.parent.report,
    },
    {
      label: 'home work',
      href: paths.parent.homework,
      icon: BookOpen,
      isActive: pathname.startsWith(paths.parent.homework),
    },
    {
      label: 'Chat',
      href: paths.parent.chat,
      icon: MessageSquare,
      isActive: pathname.startsWith(paths.parent.chat),
    },
    {
      label: 'Profile',
      href: paths.parent.profile,
      icon: User,
      isActive: pathname.startsWith(paths.parent.profile),
    },
  ];

  return (
    <nav
      aria-label="Parent Bottom Navigation"
      className="fixed right-0 bottom-0 left-0 z-40 border-t border-gray-200/90 bg-white/95 shadow-md backdrop-blur-md transition-all"
    >
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2 sm:px-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex flex-1 flex-col items-center justify-center py-1 transition-all ${
                active ? 'text-black' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${
                  active ? 'scale-110' : 'group-hover:scale-105'
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    active ? 'fill-black/10 stroke-[2.5px] text-black' : 'stroke-[1.8px]'
                  }`}
                />
              </div>
              <span
                className={`text-[11px] font-medium transition-all ${
                  active ? 'font-bold text-black' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
