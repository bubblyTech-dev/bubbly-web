'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { Phone, MessageSquare, ArrowLeft, Search, Check } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  parentName: string;
  phone: string;
  attendance: 'Present' | 'Absent' | 'Late';
  dob: string;
}

const initialClassStudents: Student[] = [
  {
    id: 'st-1',
    name: 'Vivaan Patel',
    parentName: 'Bhavna Patel',
    phone: '+919428012345',
    attendance: 'Present',
    dob: '18/10/2021',
  },
  {
    id: 'st-2',
    name: 'Kabir Joshi',
    parentName: 'Kavita Joshi',
    phone: '+919712398765',
    attendance: 'Present',
    dob: '04/01/2022',
  },
  {
    id: 'st-3',
    name: 'Ananya Gupta Jr',
    parentName: 'Ritu Gupta',
    phone: '+919123456789',
    attendance: 'Absent',
    dob: '22/07/2021',
  },
  {
    id: 'st-4',
    name: 'Reyansh Shah',
    parentName: 'Sneha Shah',
    phone: '+919898011223',
    attendance: 'Present',
    dob: '12/03/2021',
  },
  {
    id: 'st-5',
    name: 'Ishaani Patel',
    parentName: 'Bhavna Patel',
    phone: '+919428012345',
    attendance: 'Present',
    dob: '19/01/2022',
  },
  {
    id: 'st-6',
    name: 'Dhruv Trivedi',
    parentName: 'Manoj Trivedi',
    phone: '+919712398765',
    attendance: 'Late',
    dob: '05/04/2022',
  },
];

export default function MyClassPage() {
  const [students, setStudents] = useState<Student[]>(initialClassStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.parentName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleAttendance = (id: string, status: Student['attendance']) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, attendance: status } : s)));
  };

  const handleSaveAll = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Breadcrumbs
        items={[{ label: 'Teacher', href: paths.teacher.dashboard }, { label: 'My Class' }]}
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
              My Class (Jr KG A)
            </h1>
            <p className="mt-0.5 text-xs text-gray-500">
              20 Enrolled Students · Room 103 · Timing 8:30 AM - 1:00 PM
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          className="flex items-center gap-1.5 self-start rounded-full bg-black px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-gray-800 active:scale-95 sm:self-auto"
        >
          {saveSuccess ? <Check className="h-4 w-4" /> : null}
          <span>{saveSuccess ? 'Attendance Saved!' : 'Save Attendance'}</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search student or parent name..."
          className="w-full rounded-full border border-gray-300 bg-white py-2 pr-4 pl-9 text-xs shadow-2xs focus:border-black focus:outline-hidden"
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-2xs">
        <div className="divide-y divide-gray-100">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="flex flex-col justify-between gap-3 p-4 transition-colors hover:bg-gray-50/70 sm:flex-row sm:items-center sm:px-6"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] text-xs font-bold text-gray-600 shadow-inner">
                  {student.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{student.name}</div>
                  <div className="text-xs text-gray-500">
                    Parent: <span className="font-medium text-gray-700">{student.parentName}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pl-14 sm:pl-0">
                <button
                  type="button"
                  onClick={() => toggleAttendance(student.id, 'Present')}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    student.attendance === 'Present'
                      ? 'bg-emerald-600 text-white'
                      : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  P
                </button>
                <button
                  type="button"
                  onClick={() => toggleAttendance(student.id, 'Absent')}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    student.attendance === 'Absent'
                      ? 'bg-rose-600 text-white'
                      : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => toggleAttendance(student.id, 'Late')}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    student.attendance === 'Late'
                      ? 'bg-amber-600 text-white'
                      : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  L
                </button>
              </div>

              <div className="flex items-center justify-end gap-2 pl-14 sm:pl-0">
                <a
                  href={`tel:${student.phone}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-black hover:text-black"
                  title="Call Parent"
                >
                  <Phone className="h-3.5 w-3.5" />
                </a>
                <Link
                  href={paths.teacher.chat}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-black hover:text-black"
                  title="Chat with Parent"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
