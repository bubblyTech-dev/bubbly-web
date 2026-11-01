'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { ArrowLeft, Clock } from 'lucide-react';

interface Period {
  time: string;
  subject: string;
  activity: string;
  room: string;
}

const weekSchedule: Record<string, Period[]> = {
  Monday: [
    {
      time: '8:30 - 9:15 AM',
      subject: 'Circle Time & Greetings',
      activity: 'Morning rhymes & weather chart',
      room: 'Room 103',
    },
    {
      time: '9:15 - 10:00 AM',
      subject: 'Phonics & Alphabet',
      activity: 'Letter sounds and flashcards',
      room: 'Room 103',
    },
    {
      time: '10:00 - 10:30 AM',
      subject: 'Snack & Nutrition',
      activity: 'Handwash & fresh fruits break',
      room: 'Dining Hall',
    },
    {
      time: '10:30 - 11:30 AM',
      subject: 'Sensory & Clay Art',
      activity: 'Clay modeling & fine motor play',
      room: 'Art Studio',
    },
    {
      time: '11:30 - 12:30 PM',
      subject: 'Outdoor Physical Play',
      activity: 'Slides, swings & balance beam',
      room: 'Playground',
    },
  ],
  Tuesday: [
    {
      time: '8:30 - 9:15 AM',
      subject: 'Circle Time',
      activity: 'Sing along & storytelling',
      room: 'Room 103',
    },
    {
      time: '9:15 - 10:00 AM',
      subject: 'Numbers & Shapes',
      activity: 'Counting beads and geometric blocks',
      room: 'Room 103',
    },
    {
      time: '10:00 - 10:30 AM',
      subject: 'Snack Break',
      activity: 'Healthy snacks break',
      room: 'Dining Hall',
    },
    {
      time: '10:30 - 11:30 AM',
      subject: 'Music & Movement',
      activity: 'Rhythm instruments & dance',
      room: 'Music Room',
    },
    {
      time: '11:30 - 12:30 PM',
      subject: 'Water & Sand Play',
      activity: 'Sensory water table',
      room: 'Garden Area',
    },
  ],
};

export default function TeacherTimetablePage() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const periods = weekSchedule[selectedDay] || weekSchedule['Monday']!;

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Breadcrumbs
        items={[{ label: 'Teacher', href: paths.teacher.dashboard }, { label: 'Time table' }]}
      />

      <div className="flex items-center gap-3">
        <Link
          href={paths.teacher.dashboard}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-2xs transition hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Class Time Table
          </h1>
          <p className="mt-0.5 text-xs text-gray-500">Jr KG A · Preschool Daily Routine</p>
        </div>
      </div>

      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
        {days.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => setSelectedDay(day)}
            className={`rounded-full px-5 py-2 text-xs font-bold transition sm:text-sm ${
              selectedDay === day
                ? 'bg-black text-white shadow-xs'
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {periods.map((period, index) => (
          <div
            key={index}
            className="flex flex-col justify-between gap-3 rounded-2xl border border-gray-100 bg-[#F4F5F7] p-5 shadow-2xs transition hover:shadow-sm sm:flex-row sm:items-center"
          >
            <div>
              <span className="text-[11px] font-bold tracking-wider text-orange-600 uppercase">
                Period {index + 1}
              </span>
              <h3 className="text-base font-extrabold text-gray-900">{period.subject}</h3>
              <p className="mt-0.5 text-xs text-gray-500">{period.activity}</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-gray-600 sm:flex-col sm:items-end sm:gap-1">
              <span className="flex items-center gap-1 font-mono">
                <Clock className="h-3.5 w-3.5 text-gray-400" />
                {period.time}
              </span>
              <span className="rounded-md bg-white px-2 py-0.5 text-[10px] text-gray-700 shadow-2xs">
                {period.room}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
