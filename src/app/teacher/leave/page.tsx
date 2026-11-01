'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { ArrowLeft, Plus, Check, Calendar, Clock } from 'lucide-react';

interface MyLeaveApplication {
  id: string;
  leaveType: string;
  dates: string;
  duration: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
}

const myInitialLeaves: MyLeaveApplication[] = [
  {
    id: 'l-1',
    leaveType: 'Casual Leave',
    dates: '12-13 Oct 2026',
    duration: '2 days',
    reason: 'Family function in hometown.',
    status: 'Approved',
    appliedOn: '08 Oct 2026',
  },
  {
    id: 'l-2',
    leaveType: 'Sick Leave',
    dates: '02 Nov 2026',
    duration: '1 day',
    reason: 'Doctor checkup appointment.',
    status: 'Pending',
    appliedOn: '30 Oct 2026',
  },
];

export default function TeacherLeavePage() {
  const [leaves, setLeaves] = useState<MyLeaveApplication[]>(myInitialLeaves);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [dates, setDates] = useState('');
  const [duration, setDuration] = useState('1 day');
  const [reason, setReason] = useState('');
  const [submittedToast, setSubmittedToast] = useState(false);

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dates.trim()) return;

    const newApp: MyLeaveApplication = {
      id: `l-${Date.now()}`,
      leaveType,
      dates,
      duration,
      reason: reason || 'Personal leave request',
      status: 'Pending',
      appliedOn: 'Today',
    };

    setLeaves([newApp, ...leaves]);
    setIsModalOpen(false);
    setDates('');
    setReason('');
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 3000);
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Breadcrumbs
        items={[{ label: 'Teacher', href: paths.teacher.dashboard }, { label: 'My Leave' }]}
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
              Teacher Leave Applications
            </h1>
            <p className="mt-0.5 text-xs text-gray-500">
              Apply & track leave requests submitted to Principal
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 self-start rounded-full bg-black px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-gray-800 active:scale-95 sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Apply Leave</span>
        </button>
      </div>

      {submittedToast && (
        <div className="animate-in fade-in flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
          <Check className="h-4 w-4 text-emerald-600" />
          <span>Leave application submitted to Principal Brij!</span>
        </div>
      )}

      <div className="space-y-3">
        {leaves.map((l) => (
          <div
            key={l.id}
            className="flex flex-col justify-between gap-3 rounded-2xl border border-gray-100 bg-[#F4F5F7] p-5 shadow-2xs transition hover:shadow-xs sm:flex-row sm:items-center"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-gray-900">{l.leaveType}</span>
                <span
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ${
                    l.status === 'Approved'
                      ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                      : l.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {l.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-600 italic">&ldquo;{l.reason}&rdquo;</p>
              <div className="mt-2 text-[11px] text-gray-400">Applied on: {l.appliedOn}</div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-gray-600 sm:flex-col sm:items-end sm:gap-1">
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                {l.dates}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-gray-500">
                <Clock className="h-3 w-3 text-gray-400" />
                {l.duration}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Apply Leave Modal */}
      {isModalOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="animate-in zoom-in-95 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-base font-bold text-gray-900">Apply for Leave</h3>
            <p className="text-xs text-gray-500">
              Submit leave request to Principal Brij for approval
            </p>

            <form onSubmit={handleSubmitLeave} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="mb-1 block font-semibold text-gray-700">Leave Type</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-xs focus:border-black focus:outline-hidden"
                >
                  <option>Casual Leave</option>
                  <option>Sick Leave</option>
                  <option>Medical Leave</option>
                  <option>Maternity Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-700">Dates</label>
                  <input
                    type="text"
                    required
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    placeholder="e.g. 05-06 Nov"
                    className="w-full rounded-xl border border-gray-300 p-2.5 text-xs focus:border-black focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-gray-700">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 2 days"
                    className="w-full rounded-xl border border-gray-300 p-2.5 text-xs focus:border-black focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">Reason for Leave</label>
                <textarea
                  rows={3}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide reason for absence..."
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-xs focus:border-black focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-black px-5 py-2 text-xs font-semibold text-white shadow-xs"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
