'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { Bell, ArrowRight } from 'lucide-react';

export default function ParentDashboardPage() {
  const [activeAnnouncement, setActiveAnnouncement] = useState<string | null>(null);

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Parent Portal' }]} />

      {/* Greeting Header (Matching Figma Image 2) */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
          <span className="text-base">👋</span>
          <span>Hello welcome back</span>
        </div>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Brijjj
        </h1>
        <p className="mt-0.5 text-xs text-gray-500">Parent of Aditya Dave · Nursery A</p>
      </div>

      {/* Notice / Announcement Card (Matching Figma Image 2) */}
      <div
        onClick={() =>
          setActiveAnnouncement(
            'Diwali vacation will commence from 31st October to 5th November 2026. School reopens on 6th November with standard morning timings.',
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
          Diwali vacation holidays schedule & Parent-Teacher Meeting (PTM) announcement released.
        </p>
      </div>

      {/* 5 Main Action Cards Grid (Matching Figma Image 2) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Calender */}
        <Link
          href={paths.parent.calendar}
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl bg-[#F4F5F7] p-6 transition hover:-translate-y-0.5 hover:bg-[#EBEEF2] hover:shadow-md"
        >
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 group-hover:text-black sm:text-xl">
              Calender
            </h2>
            <p className="mt-1 text-xs text-gray-500">Events & School Holidays</p>
          </div>
          <div className="text-xs font-bold text-gray-600 group-hover:text-black">
            Next event: Diwali Celebration →
          </div>
        </Link>

        {/* Card 2: Attendance / Activity */}
        <Link
          href={paths.parent.attendance}
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl bg-[#F4F5F7] p-6 transition hover:-translate-y-0.5 hover:bg-[#EBEEF2] hover:shadow-md"
        >
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 group-hover:text-black sm:text-xl">
              Attendance
            </h2>
            <p className="mt-1 text-xs text-gray-500">Aditya&apos;s Monthly Record</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-emerald-700">95% Present</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-600 group-hover:text-black">View logs →</span>
          </div>
        </Link>

        {/* Card 3: home work */}
        <Link
          href={paths.parent.homework}
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl bg-[#F4F5F7] p-6 transition hover:-translate-y-0.5 hover:bg-[#EBEEF2] hover:shadow-md"
        >
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 group-hover:text-black sm:text-xl">
              home work
            </h2>
            <p className="mt-1 text-xs text-gray-500">Daily Fun Preschool Tasks</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-orange-800">
              1 Pending
            </span>
            <span className="text-gray-600 group-hover:text-black">Worksheet →</span>
          </div>
        </Link>

        {/* Card 4: Add leave */}
        <Link
          href={paths.parent.leave}
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl bg-[#F4F5F7] p-6 transition hover:-translate-y-0.5 hover:bg-[#EBEEF2] hover:shadow-md"
        >
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 group-hover:text-black sm:text-xl">
              Add leave
            </h2>
            <p className="mt-1 text-xs text-gray-500">Apply Child Leave Online</p>
          </div>
          <div className="text-xs font-bold text-gray-600 group-hover:text-black">
            Submit request to class teacher →
          </div>
        </Link>

        {/* Card 5: Report */}
        <Link
          href={paths.parent.report}
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl bg-[#F4F5F7] p-6 transition hover:-translate-y-0.5 hover:bg-[#EBEEF2] hover:shadow-md"
        >
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 group-hover:text-black sm:text-xl">
              Report
            </h2>
            <p className="mt-1 text-xs text-gray-500">Milestone Progress & Skills</p>
          </div>
          <div className="text-xs font-bold text-emerald-700 group-hover:text-black">
            Term 1 Report Card Ready →
          </div>
        </Link>
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
