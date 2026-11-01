'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { ArrowLeft, Check, Calendar } from 'lucide-react';

interface AttendanceEntry {
  id: string;
  name: string;
  rollNo: string;
  status: 'Present' | 'Absent' | 'Late';
}

const initialEntries: AttendanceEntry[] = [
  { id: '1', name: 'Vivaan Patel', rollNo: '01', status: 'Present' },
  { id: '2', name: 'Kabir Joshi', rollNo: '02', status: 'Present' },
  { id: '3', name: 'Ananya Gupta Jr', rollNo: '03', status: 'Absent' },
  { id: '4', name: 'Reyansh Shah', rollNo: '04', status: 'Present' },
  { id: '5', name: 'Ishaani Patel', rollNo: '05', status: 'Present' },
  { id: '6', name: 'Dhruv Trivedi', rollNo: '06', status: 'Late' },
  { id: '7', name: 'Aditya Dave', rollNo: '07', status: 'Present' },
  { id: '8', name: 'Kiara Mehta', rollNo: '08', status: 'Present' },
];

export default function TeacherAttendancePage() {
  const [entries, setEntries] = useState<AttendanceEntry[]>(initialEntries);
  const [saved, setSaved] = useState(false);

  const presentCount = entries.filter((e) => e.status === 'Present').length;
  const absentCount = entries.filter((e) => e.status === 'Absent').length;
  const lateCount = entries.filter((e) => e.status === 'Late').length;

  const updateStatus = (id: string, status: AttendanceEntry['status']) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Breadcrumbs
        items={[{ label: 'Teacher', href: paths.teacher.dashboard }, { label: 'Attendance' }]}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={paths.teacher.dashboard}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-2xs transition hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Daily Attendance Sheet
            </h1>
            <p className="mt-0.5 text-xs text-gray-500">Jr KG A · Class Teacher Brij</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-1.5 self-start rounded-full bg-black px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-gray-800 active:scale-95 sm:self-auto"
        >
          {saved ? <Check className="h-4 w-4 text-emerald-400" /> : null}
          <span>{saved ? 'Attendance Recorded!' : 'Submit Attendance'}</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-[#F4F5F7] p-4 text-center">
          <div className="text-xs font-medium text-gray-500">Present</div>
          <div className="mt-1 text-2xl font-extrabold text-emerald-700 sm:text-3xl">
            {presentCount}
          </div>
        </div>
        <div className="rounded-2xl bg-[#F4F5F7] p-4 text-center">
          <div className="text-xs font-medium text-gray-500">Absent</div>
          <div className="mt-1 text-2xl font-extrabold text-rose-600 sm:text-3xl">
            {absentCount}
          </div>
        </div>
        <div className="rounded-2xl bg-[#F4F5F7] p-4 text-center">
          <div className="text-xs font-medium text-gray-500">Late</div>
          <div className="mt-1 text-2xl font-extrabold text-amber-600 sm:text-3xl">{lateCount}</div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>Today&apos;s Roll Call</span>
          </div>
          <span className="text-xs text-gray-400">{entries.length} students</span>
        </div>

        <div className="divide-y divide-gray-100">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50/70"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 font-mono text-xs font-bold text-gray-700">
                  {entry.rollNo}
                </span>
                <span className="text-sm font-bold text-gray-900">{entry.name}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => updateStatus(entry.id, 'Present')}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    entry.status === 'Present'
                      ? 'bg-emerald-600 text-white'
                      : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Present
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(entry.id, 'Absent')}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    entry.status === 'Absent'
                      ? 'bg-rose-600 text-white'
                      : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Absent
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(entry.id, 'Late')}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    entry.status === 'Late'
                      ? 'bg-amber-600 text-white'
                      : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Late
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
