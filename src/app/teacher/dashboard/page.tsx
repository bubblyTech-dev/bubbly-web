'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { Bell, ArrowRight } from 'lucide-react';

interface StaffOnLeave {
  id: string;
  name: string;
  role: string;
}

interface StudentOnLeave {
  id: string;
  name: string;
  classType: string;
}

const teachersOnLeave: StaffOnLeave[] = [
  { id: 't-1', name: 'Ananya Gupta', role: 'Teacher · Jr KG' },
  { id: 't-2', name: 'Neha Verma', role: 'Assistant · Playgroup' },
  { id: 't-3', name: 'Priya Sharma', role: 'Teacher · Nursery' },
  { id: 't-4', name: 'Pallavi Dave', role: 'Teacher · Sr KG' },
];

const studentsOnLeave: StudentOnLeave[] = [
  { id: 's-1', name: 'Aditya Dave', classType: 'Nursery A' },
  { id: 's-2', name: 'Kiara Mehta', classType: 'Playgroup' },
  { id: 's-3', name: 'Aarav Singhania', classType: 'Playgroup' },
  { id: 's-4', name: 'Reyansh Shah', classType: 'Nursery B' },
  { id: 's-5', name: 'Ishaani Patel', classType: 'Jr KG' },
];

export default function TeacherDashboardPage() {
  const [leaveTab, setLeaveTab] = useState<'teachers' | 'students'>('teachers');
  const [activeAnnouncement, setActiveAnnouncement] = useState<string | null>(null);

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Teacher Dashboard' }]} />

      {/* Greeting Header (Matching Figma Image 1) */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
          <span className="text-base">👋</span>
          <span>Hello</span>
        </div>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Good Morning, Brij
        </h1>
        <p className="mt-0.5 text-xs text-gray-500">Class Teacher · Jr KG A</p>
      </div>

      {/* Notice / Announcement Banner Card (Matching Figma Image 1) */}
      <div
        onClick={() =>
          setActiveAnnouncement(
            'Diwali activity week starts from Monday! All class teachers are requested to organize clay diya painting materials in activity room 102.',
          )
        }
        className="group relative cursor-pointer rounded-2xl border-2 border-gray-300 bg-white p-4 shadow-2xs transition hover:border-black hover:shadow-xs sm:p-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <Bell className="h-4 w-4" />
            </span>
            <span className="text-sm font-extrabold text-gray-900 group-hover:text-black">
              Notice/announcement
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-black">
            <span>View circular</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
        <p className="mt-2 text-xs text-gray-600">
          Diwali activity week starts from Monday · Circular for parents and activity schedules
          updated.
        </p>
      </div>

      {/* 3 Main Action Cards Grid (Matching Figma Image 1) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Card 1: My class */}
        <Link
          href={paths.teacher.myClass}
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl bg-[#F4F5F7] p-6 transition hover:-translate-y-0.5 hover:bg-[#EBEEF2] hover:shadow-md"
        >
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 group-hover:text-black sm:text-xl">
              My class
            </h2>
            <p className="mt-1 text-xs text-gray-500">Jr KG A</p>
          </div>
          <div className="text-xs font-bold text-gray-600 group-hover:text-black">
            20 students →
          </div>
        </Link>

        {/* Card 2: Attendance */}
        <Link
          href={paths.teacher.attendance}
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl bg-[#F4F5F7] p-6 transition hover:-translate-y-0.5 hover:bg-[#EBEEF2] hover:shadow-md"
        >
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 group-hover:text-black sm:text-xl">
              Attendance
            </h2>
            <p className="mt-1 text-xs text-gray-500">Today&apos;s summary</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="text-emerald-700">20 P</span>
            <span className="text-rose-600">5 A</span>
            <span className="text-gray-400 group-hover:text-black">Mark now →</span>
          </div>
        </Link>

        {/* Card 3: Time table */}
        <Link
          href={paths.teacher.timetable}
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl bg-[#F4F5F7] p-6 transition hover:-translate-y-0.5 hover:bg-[#EBEEF2] hover:shadow-md"
        >
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 group-hover:text-black sm:text-xl">
              Time table
            </h2>
            <p className="mt-1 text-xs text-gray-500">Weekly schedule</p>
          </div>
          <div className="text-xs font-bold text-gray-600 group-hover:text-black">
            5 periods today →
          </div>
        </Link>
      </div>

      {/* On Leave Section (Matching Figma Image 1) */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-extrabold tracking-tight text-gray-900 sm:text-xl">On leave</h2>

        {/* Filter Pills: Teachers(2) vs Students(12) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLeaveTab('teachers')}
            className={`rounded-full px-5 py-2 text-xs font-bold transition sm:text-sm ${
              leaveTab === 'teachers'
                ? 'bg-black text-white shadow-xs'
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Teachers(2)
          </button>

          <button
            type="button"
            onClick={() => setLeaveTab('students')}
            className={`rounded-full px-5 py-2 text-xs font-bold transition sm:text-sm ${
              leaveTab === 'students'
                ? 'bg-black text-white shadow-xs'
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Students(12)
          </button>
        </div>

        {/* Circular Avatars Row with Names Below (Matching Figma Image 1) */}
        <div className="no-scrollbar flex items-start gap-6 overflow-x-auto pt-2 pb-2">
          {leaveTab === 'teachers'
            ? teachersOnLeave.map((t) => (
                <div key={t.id} className="flex shrink-0 flex-col items-center gap-2 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E5E7EB] text-sm font-bold text-gray-600 shadow-inner sm:h-20 sm:w-20 sm:text-base">
                    {t.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="max-w-[80px] text-xs font-bold text-gray-900 sm:max-w-[100px]">
                    {t.name}
                  </div>
                  <div className="max-w-[80px] truncate text-[10px] text-gray-500 sm:max-w-[100px]">
                    {t.role}
                  </div>
                </div>
              ))
            : studentsOnLeave.map((s) => (
                <div key={s.id} className="flex shrink-0 flex-col items-center gap-2 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E5E7EB] text-sm font-bold text-gray-600 shadow-inner sm:h-20 sm:w-20 sm:text-base">
                    {s.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="max-w-[80px] text-xs font-bold text-gray-900 sm:max-w-[100px]">
                    {s.name}
                  </div>
                  <div className="text-[10px] text-gray-500">{s.classType}</div>
                </div>
              ))}
        </div>
      </div>

      {/* Announcement Modal */}
      {activeAnnouncement && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-base font-bold text-gray-900">Notice / Announcement</h3>
            <p className="mt-3 text-xs leading-relaxed text-gray-600">{activeAnnouncement}</p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveAnnouncement(null)}
                className="rounded-full bg-black px-5 py-2 text-xs font-semibold text-white transition hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
