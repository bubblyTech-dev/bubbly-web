'use client';

import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { ArrowLeft, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface AttendanceDay {
  date: string;
  day: string;
  status: 'Present' | 'Absent' | 'Late';
  timeIn: string;
}

const attendanceLogs: AttendanceDay[] = [
  { date: '30 Oct 2026', day: 'Friday', status: 'Present', timeIn: '8:45 AM' },
  { date: '29 Oct 2026', day: 'Thursday', status: 'Present', timeIn: '8:40 AM' },
  { date: '28 Oct 2026', day: 'Wednesday', status: 'Present', timeIn: '8:42 AM' },
  { date: '27 Oct 2026', day: 'Tuesday', status: 'Late', timeIn: '9:15 AM' },
  { date: '26 Oct 2026', day: 'Monday', status: 'Present', timeIn: '8:45 AM' },
  { date: '23 Oct 2026', day: 'Friday', status: 'Absent', timeIn: 'Excused Leave' },
];

export default function ParentAttendancePage() {
  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Breadcrumbs
        items={[{ label: 'Parent Portal', href: paths.parent.dashboard }, { label: 'Attendance' }]}
      />

      <div className="flex items-center gap-3">
        <Link
          href={paths.parent.dashboard}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-2xs transition hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Aditya&apos;s Attendance Record
          </h1>
          <p className="mt-0.5 text-xs text-gray-500">
            Nursery A · Morning Batch (8:45 AM - 12:30 PM)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-[#F4F5F7] p-4 text-center">
          <div className="text-xs font-medium text-gray-500">Attendance Rate</div>
          <div className="mt-1 text-2xl font-extrabold text-emerald-700 sm:text-3xl">95%</div>
        </div>
        <div className="rounded-2xl bg-[#F4F5F7] p-4 text-center">
          <div className="text-xs font-medium text-gray-500">Days Present</div>
          <div className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">21</div>
        </div>
        <div className="rounded-2xl bg-[#F4F5F7] p-4 text-center">
          <div className="text-xs font-medium text-gray-500">Excused Leaves</div>
          <div className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">1</div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-2xs">
        <div className="border-b border-gray-100 p-4 text-xs font-bold text-gray-700">
          Daily Log History · October 2026
        </div>
        <div className="divide-y divide-gray-100">
          {attendanceLogs.map((log, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50/70"
            >
              <div>
                <div className="text-sm font-bold text-gray-900">{log.date}</div>
                <div className="text-xs text-gray-400">{log.day}</div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-gray-500">{log.timeIn}</span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                    log.status === 'Present'
                      ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                      : log.status === 'Late'
                        ? 'border border-amber-200 bg-amber-50 text-amber-700'
                        : 'border border-rose-200 bg-rose-50 text-rose-700'
                  }`}
                >
                  {log.status === 'Present' ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : log.status === 'Late' ? (
                    <Clock className="h-3.5 w-3.5" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5" />
                  )}
                  <span>{log.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
