'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Clock, MapPin, Users, Tag } from 'lucide-react';

interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: 'Event' | 'Holiday' | 'Meeting' | 'Activity';
  targetAudience: string;
  location: string;
}

const initialEvents: SchoolEvent[] = [
  {
    id: 'ev-1',
    title: 'Diwali Celebration & Diya Painting Day',
    date: '28 Oct 2026',
    time: '9:30 AM - 12:00 PM',
    category: 'Activity',
    targetAudience: 'All Preschoolers',
    location: 'Main Activity Hall',
  },
  {
    id: 'ev-2',
    title: 'Diwali Vacation Holiday',
    date: '31 Oct - 05 Nov 2026',
    time: 'Full Day',
    category: 'Holiday',
    targetAudience: 'School Closed',
    location: 'Campus Wide',
  },
  {
    id: 'ev-3',
    title: 'Nursery & Jr KG Parent-Teacher Meeting (PTM)',
    date: '10 Nov 2026',
    time: '9:00 AM - 1:00 PM',
    category: 'Meeting',
    targetAudience: 'Parents & Class Teachers',
    location: 'Classrooms 102 & 103',
  },
  {
    id: 'ev-4',
    title: 'Annual Sports Day & Fun Races',
    date: '22 Nov 2026',
    time: '8:30 AM - 12:30 PM',
    category: 'Event',
    targetAudience: 'All Kids & Guardians',
    location: 'Open Ground',
  },
];

export default function CalendarPage() {
  const [events] = useState<SchoolEvent[]>(initialEvents);
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Event', 'Holiday', 'Meeting', 'Activity'];

  const filteredEvents = events.filter((ev) =>
    filterCategory === 'All' ? true : ev.category === filterCategory,
  );

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Calendar manage' }]} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Calendar & Events
          </h1>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Manage school holidays, upcoming celebrations, parent meetings, and activity schedules.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCategory(cat)}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition sm:text-sm ${
              filterCategory === cat
                ? 'bg-black text-white shadow-xs'
                : 'border border-gray-300 bg-white text-gray-800 hover:border-black hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-[#F4F5F7] p-5 shadow-2xs transition hover:shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    ev.category === 'Holiday'
                      ? 'bg-rose-100 text-rose-800'
                      : ev.category === 'Activity'
                        ? 'bg-amber-100 text-amber-800'
                        : ev.category === 'Meeting'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  <Tag className="h-3 w-3" />
                  {ev.category}
                </span>

                <span className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 font-mono text-xs font-bold text-gray-900">
                  {ev.date}
                </span>
              </div>

              <h3 className="mt-3 text-base leading-snug font-bold text-gray-900">{ev.title}</h3>

              <div className="mt-3 space-y-1.5 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  <span>{ev.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  <span>{ev.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-gray-400" />
                  <span>Audience: {ev.targetAudience}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end border-t border-gray-200/80 pt-3">
              <button type="button" className="text-xs font-bold text-black hover:underline">
                Edit Event
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
