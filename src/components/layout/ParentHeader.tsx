'use client';

import { useState } from 'react';
import { Bell, Plus, Check } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { RoleSwitcher } from '@/components/common/RoleSwitcher';
import { NotificationsModal } from '@/components/common/NotificationsModal';

interface Child {
  id: string;
  name: string;
  classType: string;
  rollNo: string;
}

const enrolledChildren: Child[] = [
  { id: 'ch-1', name: 'Aditya Dave', classType: 'Nursery A', rollNo: '12' },
  { id: 'ch-2', name: 'Kiara Dave', classType: 'Playgroup B', rollNo: '04' },
];

export function ParentHeader() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChildrenModalOpen, setIsChildrenModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child>(enrolledChildren[0]!);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-3 sm:px-6 lg:px-8">
          {/* Left: Brand Logo & Role Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Logo size="md" />
            <RoleSwitcher currentRole="parent" />
          </div>

          {/* Right: Bell & + Children Pill Button (Matching Figma Screenshot 2) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsNotificationsOpen(true)}
              aria-label="Notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-black/80 bg-white text-black transition-transform hover:scale-105 active:scale-95 sm:h-10 sm:w-10"
            >
              <Bell className="h-4 w-4 text-black sm:h-4.5 sm:w-4.5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white ring-2 ring-white sm:h-4.5 sm:w-4.5">
                3
              </span>
            </button>

            {/* + Children Button (Matching Figma Screenshot 2) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsChildrenModalOpen(!isChildrenModalOpen)}
                className="flex items-center gap-1.5 rounded-full bg-black px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-gray-800 active:scale-95 sm:px-5 sm:py-2 sm:text-sm"
              >
                <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>{selectedChild.name.split(' ')[0]}</span>
              </button>

              {isChildrenModalOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsChildrenModalOpen(false)}
                  />
                  <div className="animate-in fade-in-50 zoom-in-95 absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                    <div className="px-2 py-1 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                      Select Child Profile
                    </div>

                    {enrolledChildren.map((child) => {
                      const isSelected = selectedChild.id === child.id;
                      return (
                        <button
                          key={child.id}
                          type="button"
                          onClick={() => {
                            setSelectedChild(child);
                            setIsChildrenModalOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs transition ${
                            isSelected
                              ? 'bg-black font-semibold text-white'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div>
                            <div className="font-semibold">{child.name}</div>
                            <div
                              className={`text-[10px] ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}
                            >
                              {child.classType} · Roll #{child.rollNo}
                            </div>
                          </div>
                          {isSelected && <Check className="h-3.5 w-3.5" />}
                        </button>
                      );
                    })}

                    <div className="mt-1 border-t border-gray-100 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsChildrenModalOpen(false)}
                        className="flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-black"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>+ Add another child</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
}
