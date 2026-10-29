import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  IndianRupee,
  Calendar as CalendarIcon,
  ArrowRight,
  UserCheck,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { paths } from '@/config/paths';

export const metadata: Metadata = {
  title: 'Principal Dashboard | Bubbly',
  description: 'Preschool administration dashboard for Bubbly Principal Admin',
};

export default function DashboardPage() {
  const staffOnLeave = [
    { id: 1, name: 'Ananya Gupta', role: 'Teacher · Jr KG', avatar: '/assets/images/favicon.png' },
    { id: 2, name: 'Pallavi Dave', role: 'Teacher · Sr KG A', avatar: null },
    { id: 3, name: 'Priya Sharma', role: 'Teacher · Nursery', avatar: null },
    { id: 4, name: 'Neha Verma', role: 'Assistant · Playgroup', avatar: null },
  ];

  return (
    <div className="animate-in fade-in space-y-8 duration-300">
      {/* Greeting Header */}
      <div>
        <div className="flex items-center gap-2 text-base font-medium text-gray-700">
          <span className="text-xl">👋</span>
          <span>Hello</span>
        </div>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Good Morning, Brij
        </h1>
        <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
          Here is what is happening at Bubbly Preschool today.
        </p>
      </div>

      {/* Primary Action / Feature Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Card 1: New Inquiries */}
        <Link
          href={paths.workspace.inquiries}
          className="group relative flex flex-col justify-between rounded-2xl bg-[#F4F5F7] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white shadow-xs transition-transform group-hover:scale-105">
              <Home className="h-6 w-6 stroke-[2px]" />
            </div>
            {/* Notification Badge */}
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-2 text-xs font-bold text-white shadow-xs">
              22
            </span>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <span className="text-base font-bold text-gray-900 group-hover:text-black">
              New inquires
            </span>
            <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
          </div>
        </Link>

        {/* Card 2: Fee Manage */}
        <Link
          href={paths.workspace.fees}
          className="group relative flex flex-col justify-between rounded-2xl bg-[#F4F5F7] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white shadow-xs transition-transform group-hover:scale-105">
              <IndianRupee className="h-6 w-6 stroke-[2px]" />
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <span className="text-base font-bold text-gray-900 group-hover:text-black">
              Fee manage
            </span>
            <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
          </div>
        </Link>

        {/* Card 3: Calendar Manage */}
        <Link
          href={paths.workspace.calendar}
          className="group relative flex flex-col justify-between rounded-2xl bg-[#F4F5F7] p-5 ring-2 ring-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white shadow-xs ring-2 ring-blue-500 ring-offset-2 transition-transform group-hover:scale-105">
              <CalendarIcon className="h-6 w-6 stroke-[2px]" />
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <span className="text-base font-bold text-gray-900 group-hover:text-black">
              Calendar manage
            </span>
            <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
          </div>
        </Link>
      </div>

      {/* On Leave Section */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-900">On leave</h2>
          <Link
            href={paths.workspace.leave}
            className="group relative flex items-center gap-1.5 rounded-full bg-black px-3.5 py-1 text-xs font-semibold text-white shadow-xs transition hover:bg-gray-800"
          >
            <span>3 new request</span>
            {/* Cute floating Bubbly icon badge */}
            <span className="absolute -top-3 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white p-0.5 shadow-md transition-transform group-hover:scale-110">
              <Image
                src="/assets/images/favicon.png"
                alt="Bubbly"
                width={20}
                height={20}
                className="rounded-full"
              />
            </span>
          </Link>
        </div>

        {/* Avatars Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {staffOnLeave.map((person) => (
            <Link
              key={person.id}
              href={paths.workspace.leave}
              className="group flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-[#FBFBFC] p-3 text-center transition hover:bg-[#F4F5F7]"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EAECEF] text-gray-400 shadow-inner transition-transform group-hover:scale-105">
                {person.avatar ? (
                  <Image
                    src={person.avatar}
                    alt={person.name}
                    width={80}
                    height={80}
                    className="h-full w-full rounded-full object-cover p-1"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 text-xl font-bold text-gray-600">
                    {person.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}
              </div>
              <span className="mt-2.5 text-xs font-semibold text-gray-900 group-hover:text-black">
                {person.name}
              </span>
              <span className="text-[11px] text-gray-500">{person.role}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Operational Highlights (Preschool Metrics per SOW) */}
      <section className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-medium text-gray-500">
            <span>Today&apos;s Attendance</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">96.4%</span>
            <span className="text-xs text-gray-500">505 / 524 present</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: '96.4%' }} />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-medium text-gray-500">
            <span>Active Classes</span>
            <UserCheck className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">4 Classes</span>
            <span className="text-xs text-gray-500">Playgroup to Sr KG</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">18 Teachers active today</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-medium text-gray-500">
            <span>Fee Collection (October)</span>
            <Clock className="h-4 w-4 text-orange-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">₹1,82,000</span>
            <span className="text-xs font-semibold text-emerald-600">+14% vs Sep</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">78% of annual target reached</p>
        </div>
      </section>
    </div>
  );
}
