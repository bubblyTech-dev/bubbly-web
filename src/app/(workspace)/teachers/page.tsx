'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Search, Phone, Mail, GraduationCap } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  role: string;
  classAssigned: string;
  phone: string;
  email: string;
  status: 'Present' | 'On Leave' | 'Late';
  joiningDate: string;
}

const initialTeachers: Teacher[] = [
  {
    id: 't-1',
    name: 'Pallavi Dave',
    role: 'Senior Preschool Educator',
    classAssigned: 'Sr KG A',
    phone: '+919685775896',
    email: 'pallavi.dave@bubbly.school',
    status: 'On Leave',
    joiningDate: 'June 2024',
  },
  {
    id: 't-2',
    name: 'Ananya Gupta',
    role: 'Preschool Teacher',
    classAssigned: 'Jr KG',
    phone: '+919123456789',
    email: 'ananya.gupta@bubbly.school',
    status: 'On Leave',
    joiningDate: 'August 2024',
  },
  {
    id: 't-3',
    name: 'Priya Sharma',
    role: 'Nursery Lead Educator',
    classAssigned: 'Nursery',
    phone: '+919876543210',
    email: 'priya.sharma@bubbly.school',
    status: 'Present',
    joiningDate: 'May 2023',
  },
  {
    id: 't-4',
    name: 'Neha Verma',
    role: 'Playgroup Assistant & Caregiver',
    classAssigned: 'Playgroup',
    phone: '+919428012345',
    email: 'neha.verma@bubbly.school',
    status: 'Present',
    joiningDate: 'January 2025',
  },
  {
    id: 't-5',
    name: 'Kavita Joshi',
    role: 'Art & Rhymes Teacher',
    classAssigned: 'Sr KG B',
    phone: '+919898011223',
    email: 'kavita.joshi@bubbly.school',
    status: 'Present',
    joiningDate: 'October 2024',
  },
];

export default function TeachersPage() {
  const [teachers] = useState<Teacher[]>(initialTeachers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('All');

  const filtered = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.classAssigned.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = filterClass === 'All' || t.classAssigned.includes(filterClass);
    return matchesSearch && matchesClass;
  });

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Teachers' }]} />

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Teachers & Staff ({teachers.length})
          </h1>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Manage teacher profiles, classroom assignments, and daily attendance.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teacher or class..."
            className="w-full rounded-full border border-gray-300 bg-white py-2 pr-4 pl-9 text-xs shadow-2xs focus:border-black focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          {['All', 'Playgroup', 'Nursery', 'Jr KG', 'Sr KG'].map((cls) => (
            <button
              key={cls}
              type="button"
              onClick={() => setFilterClass(cls)}
              className={`rounded-full px-4 py-1.5 transition ${
                filterClass === cls
                  ? 'bg-black text-white shadow-xs'
                  : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Teachers Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-[#FBFBFC] p-5 shadow-2xs transition hover:shadow-md"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 text-base font-bold text-gray-700 shadow-inner">
                    {t.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{t.name}</h3>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    t.status === 'Present'
                      ? 'bg-emerald-50 text-emerald-700'
                      : t.status === 'On Leave'
                        ? 'bg-rose-50 text-rose-700'
                        : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      t.status === 'Present'
                        ? 'bg-emerald-500'
                        : t.status === 'On Leave'
                          ? 'bg-rose-500'
                          : 'bg-amber-500'
                    }`}
                  />
                  {t.status}
                </span>
              </div>

              <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-3 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-3.5 w-3.5 text-gray-400" />
                  <span className="font-semibold text-gray-800">Class: {t.classAssigned}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-gray-400" />
                  <a href={`tel:${t.phone}`} className="font-mono hover:underline">
                    {t.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-gray-400" />
                  <a href={`mailto:${t.email}`} className="max-w-[200px] truncate hover:underline">
                    {t.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-[11px] text-gray-400">
              <span>Since {t.joiningDate}</span>
              <button type="button" className="font-bold text-gray-900 underline hover:text-black">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
