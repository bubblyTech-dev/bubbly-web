'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Check } from 'lucide-react';

interface RoleSwitcherProps {
  currentRole: 'principal' | 'teacher' | 'parent';
}

export function RoleSwitcher({ currentRole }: RoleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const roleLabels = {
    principal: 'Principal Admin',
    teacher: 'Teacher App',
    parent: 'Parent App',
  };

  const handleSelect = (role: 'principal' | 'teacher' | 'parent') => {
    setIsOpen(false);
    if (role === 'principal') router.push('/dashboard');
    if (role === 'teacher') router.push('/teacher/dashboard');
    if (role === 'parent') router.push('/parent/dashboard');
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50/90 px-2 py-0.5 text-[10px] font-semibold text-gray-800 shadow-2xs transition hover:bg-gray-100 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[11px]"
        title="Switch App Role (Principal, Teacher, Parent)"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 sm:h-2 sm:w-2" />
        <span className="capitalize">{roleLabels[currentRole]}</span>
        <ChevronDown className="h-3 w-3 text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="animate-in fade-in-50 zoom-in-95 absolute left-0 z-50 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
            <div className="px-2 py-1 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
              Switch Bubbly App
            </div>

            <button
              type="button"
              onClick={() => handleSelect('principal')}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition ${
                currentRole === 'principal'
                  ? 'bg-black font-semibold text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div>
                <div className="font-semibold">Principal Admin</div>
                <div
                  className={`text-[10px] ${currentRole === 'principal' ? 'text-gray-300' : 'text-gray-400'}`}
                >
                  School Management & Operations
                </div>
              </div>
              {currentRole === 'principal' && <Check className="h-3.5 w-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => handleSelect('teacher')}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition ${
                currentRole === 'teacher'
                  ? 'bg-black font-semibold text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div>
                <div className="font-semibold">Teacher App</div>
                <div
                  className={`text-[10px] ${currentRole === 'teacher' ? 'text-gray-300' : 'text-gray-400'}`}
                >
                  My Class, Attendance, Homework
                </div>
              </div>
              {currentRole === 'teacher' && <Check className="h-3.5 w-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => handleSelect('parent')}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition ${
                currentRole === 'parent'
                  ? 'bg-black font-semibold text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div>
                <div className="font-semibold">Parent App</div>
                <div
                  className={`text-[10px] ${currentRole === 'parent' ? 'text-gray-300' : 'text-gray-400'}`}
                >
                  Child Progress, Homework, Leave
                </div>
              </div>
              {currentRole === 'parent' && <Check className="h-3.5 w-3.5" />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
