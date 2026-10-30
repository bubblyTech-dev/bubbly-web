'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Search, Check, X, UserCheck, MessageSquare } from 'lucide-react';

export interface Teacher {
  id: string;
  name: string;
  role: string;
  classAssigned: string;
  phone: string;
  email: string;
  attendanceStatus: 'Present' | 'On Leave' | 'Late';
  joiningDate: string;
  qualification: string;
  experience: string;
  emergencyContact: string;
}

export const initialTeachersList: Teacher[] = [
  {
    id: 't-1',
    name: 'Pallavi Dave',
    role: 'Teacher',
    classAssigned: 'Class:jr kg',
    phone: '+919685775896',
    email: 'pallavi.dave@bubbly.school',
    attendanceStatus: 'Present',
    joiningDate: 'June 2024',
    qualification: 'B.Ed in Early Childhood Education',
    experience: '4 years',
    emergencyContact: '+919825011223',
  },
  {
    id: 't-2',
    name: 'Ananya Gupta',
    role: 'Teacher',
    classAssigned: 'Class:jr kg',
    phone: '+919123456789',
    email: 'ananya.gupta@bubbly.school',
    attendanceStatus: 'On Leave',
    joiningDate: 'August 2024',
    qualification: 'Diploma in Montessori Teaching',
    experience: '3 years',
    emergencyContact: '+919876543211',
  },
  {
    id: 't-3',
    name: 'Priya Sharma',
    role: 'Teacher',
    classAssigned: 'Class:nursery',
    phone: '+919876543210',
    email: 'priya.sharma@bubbly.school',
    attendanceStatus: 'Present',
    joiningDate: 'May 2023',
    qualification: 'M.A. Child Psychology & ECCEd',
    experience: '5 years',
    emergencyContact: '+919428099887',
  },
  {
    id: 't-4',
    name: 'Neha Verma',
    role: 'Teacher',
    classAssigned: 'Class:playgroup',
    phone: '+919428012345',
    email: 'neha.verma@bubbly.school',
    attendanceStatus: 'Present',
    joiningDate: 'January 2025',
    qualification: 'Pre-primary Teacher Training (PPTT)',
    experience: '2 years',
    emergencyContact: '+919898033445',
  },
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachersList);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAttendanceTeacher, setActiveAttendanceTeacher] = useState<Teacher | null>(null);
  const [messageToast, setMessageToast] = useState<string | null>(null);

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.classAssigned.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleUpdateAttendance = (id: string, status: Teacher['attendanceStatus']) => {
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, attendanceStatus: status } : t)));
    if (activeAttendanceTeacher && activeAttendanceTeacher.id === id) {
      setActiveAttendanceTeacher({ ...activeAttendanceTeacher, attendanceStatus: status });
    }
  };

  const handleSendMessage = (teacher: Teacher) => {
    setMessageToast(`Chat initiated with ${teacher.name} (${teacher.role})`);
    setTimeout(() => setMessageToast(null), 3000);
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Teacher' }]} />

      {/* Header Row: Title matching Figma Image 4 */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Teacher({teachers.length})
          </h1>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Faculty roster, classroom assignments, daily attendance, and profiles.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teacher..."
            className="w-full rounded-full border border-gray-300 bg-white py-1.5 pr-4 pl-8 text-xs shadow-2xs focus:border-black focus:outline-hidden"
          />
        </div>
      </div>

      {/* Teacher List / Table (Matching Figma Image 4) */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xs">
        {filteredTeachers.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm font-medium text-gray-500">No teachers found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="group flex flex-col justify-between gap-3 p-4 transition-colors hover:bg-gray-50/70 sm:flex-row sm:items-center sm:px-6"
              >
                {/* Left: Avatar & Name */}
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] text-xs font-bold text-gray-600 shadow-inner">
                    {teacher.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 group-hover:text-black">
                      {teacher.name}
                    </div>
                    <div className="text-xs text-gray-400 sm:hidden">{teacher.classAssigned}</div>
                  </div>
                </div>

                {/* Middle: Class, Role, Attendance Action */}
                <div className="flex flex-wrap items-center gap-4 pl-14 text-xs text-gray-700 sm:gap-8 sm:pl-0">
                  <span className="hidden font-medium text-gray-600 sm:inline">
                    {teacher.classAssigned}
                  </span>
                  <span className="font-medium text-gray-600">{teacher.role}</span>

                  {/* Attendance Underlined Action Button (Matching Figma Image 4) */}
                  <button
                    type="button"
                    onClick={() => setActiveAttendanceTeacher(teacher)}
                    className="flex items-center gap-1 font-semibold text-gray-800 underline transition hover:text-black"
                  >
                    <span>Attendance</span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        teacher.attendanceStatus === 'Present'
                          ? 'bg-emerald-500'
                          : teacher.attendanceStatus === 'On Leave'
                            ? 'bg-rose-500'
                            : 'bg-amber-500'
                      }`}
                    />
                  </button>
                </div>

                {/* Right Actions: Profile & Message (Matching Figma Image 4) */}
                <div className="flex items-center justify-end gap-2 pl-14 sm:pl-0">
                  <Link
                    href={`/teachers/${teacher.id}`}
                    className="rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-gray-800 active:scale-95"
                  >
                    Profile
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleSendMessage(teacher)}
                    className="rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-gray-800 active:scale-95"
                  >
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Toast */}
      {messageToast && (
        <div className="animate-in fade-in slide-in-from-bottom-2 fixed right-6 bottom-20 z-50 flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs text-white shadow-xl">
          <MessageSquare className="h-4 w-4 text-emerald-400" />
          <span>{messageToast}</span>
        </div>
      )}

      {/* Attendance Modal (Opened by clicking "Attendance") */}
      {activeAttendanceTeacher && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-gray-700" />
                <h3 className="text-sm font-bold text-gray-900">
                  Mark Attendance: {activeAttendanceTeacher.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveAttendanceTeacher(null)}
                className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <p className="text-gray-500">
                Select today&apos;s attendance status for{' '}
                <strong className="text-gray-900">{activeAttendanceTeacher.name}</strong> (
                {activeAttendanceTeacher.classAssigned}):
              </p>

              <div className="grid grid-cols-3 gap-2">
                {(['Present', 'On Leave', 'Late'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleUpdateAttendance(activeAttendanceTeacher.id, status)}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-xs font-bold transition ${
                      activeAttendanceTeacher.attendanceStatus === status
                        ? 'border-black bg-black text-white shadow-xs'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{status}</span>
                    {activeAttendanceTeacher.attendanceStatus === status && (
                      <Check className="h-3.5 w-3.5" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-3 rounded-xl bg-gray-50 p-3 text-gray-600">
                <div className="flex justify-between py-0.5">
                  <span>Monthly Attendance:</span>
                  <span className="font-bold text-gray-900">96.8%</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>Present Days:</span>
                  <span className="font-mono font-semibold text-emerald-700">22 days</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>Leaves Taken:</span>
                  <span className="font-mono font-semibold text-rose-600">1 day</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveAttendanceTeacher(null)}
                className="rounded-full bg-black px-5 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-800"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
