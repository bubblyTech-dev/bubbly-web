'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

interface LeaveRequest {
  id: string;
  name: string;
  role: string;
  leaveType: string;
  dates: string;
  duration: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason?: string;
}

const initialLeaves: LeaveRequest[] = [
  {
    id: 'leave-1',
    name: 'Pallavi Dave',
    role: 'Teacher · Sr KG A',
    leaveType: 'Casual leave',
    dates: '12-13 Oct',
    duration: '2 day',
    status: 'Pending',
    reason: 'Family function in hometown.',
  },
  {
    id: 'leave-2',
    name: 'Ananya Gupta',
    role: 'Teacher · Jr KG',
    leaveType: 'Sick leave',
    dates: '14 Oct',
    duration: '1 day',
    status: 'Pending',
    reason: 'Doctor appointment & viral fever recovery.',
  },
  {
    id: 'leave-3',
    name: 'Priya Sharma',
    role: 'Teacher · Nursery',
    leaveType: 'Casual leave',
    dates: '15-16 Oct',
    duration: '2 day',
    status: 'Pending',
    reason: 'Personal urgent work.',
  },
  {
    id: 'leave-4',
    name: 'Neha Verma',
    role: 'Assistant · Playgroup',
    leaveType: 'Casual leave',
    dates: '18 Oct',
    duration: '1 day',
    status: 'Pending',
    reason: 'Attending child examination.',
  },
  {
    id: 'leave-5',
    name: 'Kavita Joshi',
    role: 'Teacher · Sr KG B',
    leaveType: 'Medical leave',
    dates: '01-03 Oct',
    duration: '3 day',
    status: 'Approved',
    reason: 'Post dental surgery rest.',
  },
  {
    id: 'leave-6',
    name: 'Megha Trivedi',
    role: 'Activity Coordinator',
    leaveType: 'Casual leave',
    dates: '28 Sep',
    duration: '1 day',
    status: 'Rejected',
    reason: 'Clashing with Annual Day rehearsal.',
  },
];

export default function LeaveManagePage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>(initialLeaves);
  const [filterTab, setFilterTab] = useState<'New request' | 'Approved' | 'Rejected'>(
    'New request',
  );
  const [rejectModalId, setRejectModalId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const filterTabs = ['New request', 'Approved', 'Rejected'] as const;

  const filteredLeaves = leaves.filter((item) => {
    if (filterTab === 'New request') return item.status === 'Pending';
    if (filterTab === 'Approved') return item.status === 'Approved';
    if (filterTab === 'Rejected') return item.status === 'Rejected';
    return true;
  });

  const handleAccept = (id: string) => {
    setLeaves((prev) => prev.map((l) => (l.id === id ? { ...l, status: 'Approved' } : l)));
  };

  const handleRejectConfirm = () => {
    if (!rejectModalId) return;
    setLeaves((prev) =>
      prev.map((l) =>
        l.id === rejectModalId ? { ...l, status: 'Rejected', reason: rejectReason || l.reason } : l,
      ),
    );
    setRejectModalId(null);
    setRejectReason('');
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Leave manage' }]} />

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Leave manage
        </h1>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Review and approve teacher and staff leave applications for Bubbly Preschool.
        </p>
      </div>

      {/* Status Filter Pills (Matching Figma Screen 3) */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pt-1 pb-1 sm:flex-wrap">
        {filterTabs.map((tab) => {
          const isActive = filterTab === tab;
          const count = leaves.filter((l) => {
            if (tab === 'New request') return l.status === 'Pending';
            if (tab === 'Approved') return l.status === 'Approved';
            return l.status === 'Rejected';
          }).length;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterTab(tab)}
              className={`shrink-0 rounded-full px-5 py-2 text-xs font-semibold transition-all sm:text-sm ${
                isActive
                  ? 'bg-black text-white shadow-xs'
                  : 'border border-gray-300 bg-white text-gray-800 hover:border-black hover:bg-gray-50'
              }`}
            >
              {tab}
              {count > 0 && (
                <span
                  className={`ml-1.5 text-xs ${
                    isActive ? 'text-gray-300' : 'font-normal text-gray-400'
                  }`}
                >
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* List / Table of Leave Requests (Matching Figma Screen 3) */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-2xs">
        {filteredLeaves.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm font-medium text-gray-500">
              No leave requests found in &ldquo;{filterTab}&rdquo;.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden sm:block">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-gray-100">
                  {filteredLeaves.map((leave) => (
                    <tr key={leave.id} className="group transition-colors hover:bg-gray-50/70">
                      {/* Avatar Circle */}
                      <td className="w-12 py-4 pr-3 pl-4 sm:pl-6">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] text-sm font-bold text-gray-600 shadow-inner">
                          {leave.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                      </td>

                      {/* Name & Role */}
                      <td className="px-3 py-4">
                        <div className="font-bold text-gray-900 group-hover:text-black">
                          {leave.name}
                        </div>
                        <div className="text-xs text-gray-500">{leave.role}</div>
                      </td>

                      {/* Leave Type */}
                      <td className="px-3 py-4 text-xs font-medium text-gray-700">
                        {leave.leaveType}
                      </td>

                      {/* Dates */}
                      <td className="px-3 py-4 font-mono text-xs text-gray-700">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gray-400" />
                          {leave.dates}
                        </span>
                      </td>

                      {/* Duration */}
                      <td className="px-3 py-4 font-mono text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-gray-400" />
                          {leave.duration}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="px-3 py-4">
                        <span
                          className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${
                            leave.status === 'Pending'
                              ? 'bg-gray-100 text-gray-600'
                              : leave.status === 'Approved'
                                ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                                : 'border border-rose-200 bg-rose-50 text-rose-700'
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>

                      {/* Action Buttons: Reject & Accept (Matching Figma Screen 3) */}
                      <td className="py-4 pr-4 pl-3 text-right sm:pr-6">
                        {leave.status === 'Pending' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setRejectModalId(leave.id)}
                              className="rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-gray-800 active:scale-95"
                            >
                              Reject
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAccept(leave.id)}
                              className="rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-gray-800 active:scale-95"
                            >
                              Accept
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs font-medium text-gray-400">
                            {leave.status === 'Approved' ? 'Approved by Brij' : 'Rejected'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card-Based Native View */}
            <div className="divide-y divide-gray-100 sm:hidden">
              {filteredLeaves.map((leave) => (
                <div key={leave.id} className="space-y-3 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] text-xs font-bold text-gray-700 shadow-inner">
                        {leave.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{leave.name}</div>
                        <div className="text-xs text-gray-500">{leave.role}</div>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                        leave.status === 'Pending'
                          ? 'bg-gray-100 text-gray-700'
                          : leave.status === 'Approved'
                            ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                            : 'border border-rose-200 bg-rose-50 text-rose-700'
                      }`}
                    >
                      {leave.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-xl bg-gray-50 p-3 text-xs text-gray-600">
                    <span className="font-semibold text-gray-800">{leave.leaveType}</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      {leave.dates}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="h-3 w-3 text-gray-400" />
                      {leave.duration}
                    </span>
                  </div>

                  {leave.reason && (
                    <div className="text-xs text-gray-500 italic">&ldquo;{leave.reason}&rdquo;</div>
                  )}

                  {leave.status === 'Pending' ? (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setRejectModalId(leave.id)}
                        className="w-full rounded-full border border-gray-300 bg-white py-2 text-xs font-bold text-gray-800 shadow-2xs transition active:scale-95"
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAccept(leave.id)}
                        className="w-full rounded-full bg-black py-2 text-xs font-bold text-white shadow-2xs transition active:scale-95"
                      >
                        Accept
                      </button>
                    </div>
                  ) : (
                    <div className="text-right text-xs font-medium text-gray-400">
                      {leave.status === 'Approved' ? 'Approved by Brij' : 'Rejected'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Reject Confirmation Modal */}
      {rejectModalId && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-2 flex items-center gap-2 text-rose-600">
              <AlertCircle className="h-5 w-5" />
              <h3 className="text-base font-bold text-gray-900">Reject Leave Request</h3>
            </div>
            <p className="mb-4 text-xs text-gray-500">
              Please enter an optional reason for rejecting this leave application.
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Prior commitments on these dates; substitute teacher unavailable."
              className="w-full rounded-xl border border-gray-300 p-2.5 text-xs focus:border-black focus:outline-hidden"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRejectModalId(null)}
                className="rounded-full border border-gray-300 px-4 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRejectConfirm}
                className="rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white hover:bg-gray-800"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
