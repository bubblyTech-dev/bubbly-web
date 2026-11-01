'use client';

import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { ArrowLeft, Clock, MapPin, Tag } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: 'Holiday' | 'Event' | 'Meeting';
  location: string;
}

const parentEvents: CalendarEvent[] = [
  {
    id: 'e-1',
    title: 'Diwali Vacation',
    date: '31 Oct - 05 Nov 2026',
    time: 'Full Day',
    category: 'Holiday',
    location: 'School Closed',
  },
  {
    id: 'e-2',
    title: 'Parent-Teacher Meeting (Term 1 Review)',
    date: '10 Nov 2026',
    time: '9:00 AM - 12:30 PM',
    category: 'Meeting',
    location: 'Classroom 102 (Nursery A)',
  },
  {
    id: 'e-3',
    title: 'Annual Sports Day & Fun Race for Tiny Tots',
    date: '22 Nov 2026',
    time: '8:30 AM - 12:00 PM',
    category: 'Event',
    location: 'Preschool Open Ground',
  },
];

export default function ParentCalendarPage() {
  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Breadcrumbs
        items={[{ label: 'Parent Portal', href: paths.parent.dashboard }, { label: 'Calender' }]}
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
            School Calendar & Events
          </h1>
          <p className="mt-0.5 text-xs text-gray-500">
            Upcoming preschool celebrations, holidays, and PTM
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {parentEvents.map((ev) => (
          <div
            key={ev.id}
            className="flex flex-col justify-between gap-3 rounded-2xl border border-gray-100 bg-[#F4F5F7] p-5 shadow-2xs transition hover:shadow-xs sm:flex-row sm:items-center"
          >
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ${
                    ev.category === 'Holiday'
                      ? 'bg-rose-100 text-rose-800'
                      : ev.category === 'Meeting'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {ev.category}
                </span>
                <span className="font-mono text-xs font-bold text-gray-900">{ev.date}</span>
              </div>
              <h3 className="mt-2 text-base font-extrabold text-gray-900">{ev.title}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  {ev.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  {ev.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
