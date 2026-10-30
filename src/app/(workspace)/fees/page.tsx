'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ChevronDown, BellRing, Receipt, Printer, X } from 'lucide-react';

interface FeeRecord {
  id: string;
  name: string;
  classType: string;
  term: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  status: 'Pending' | 'Completed';
  parentPhone?: string;
}

const initialFeeRecords: FeeRecord[] = [
  {
    id: 'fee-1',
    name: 'Pallavi Dave',
    classType: 'Playgroup',
    term: 'Second sem',
    totalAmount: 2400,
    paidAmount: 1200,
    pendingAmount: 1200,
    status: 'Pending',
    parentPhone: '+919685775896',
  },
  {
    id: 'fee-2',
    name: 'Rohan Mehta',
    classType: 'Playgroup',
    term: 'Second sem',
    totalAmount: 2400,
    paidAmount: 1200,
    pendingAmount: 1200,
    status: 'Pending',
    parentPhone: '+919876543210',
  },
  {
    id: 'fee-3',
    name: 'Aarav Singhania',
    classType: 'Playgroup',
    term: 'Second sem',
    totalAmount: 2400,
    paidAmount: 1000,
    pendingAmount: 1400,
    status: 'Pending',
    parentPhone: '+919822001122',
  },
  {
    id: 'fee-4',
    name: 'Ishaani Patel',
    classType: 'Playgroup',
    term: 'Annual fee',
    totalAmount: 4800,
    paidAmount: 4800,
    pendingAmount: 0,
    status: 'Completed',
    parentPhone: '+919428012345',
  },
  {
    id: 'fee-5',
    name: 'Vihaan Verma',
    classType: 'Nursery',
    term: 'Second sem',
    totalAmount: 2600,
    paidAmount: 1300,
    pendingAmount: 1300,
    status: 'Pending',
    parentPhone: '+919898011223',
  },
  {
    id: 'fee-6',
    name: 'Anaya Gupta',
    classType: 'Nursery',
    term: 'Second sem',
    totalAmount: 2600,
    paidAmount: 2600,
    pendingAmount: 0,
    status: 'Completed',
    parentPhone: '+919123456789',
  },
  {
    id: 'fee-7',
    name: 'Kabir Joshi',
    classType: 'jr kg',
    term: 'Second sem',
    totalAmount: 2800,
    paidAmount: 1400,
    pendingAmount: 1400,
    status: 'Pending',
    parentPhone: '+919712398765',
  },
  {
    id: 'fee-8',
    name: 'Dia Trivedi',
    classType: 'sr kg',
    term: 'Second sem',
    totalAmount: 3000,
    paidAmount: 1500,
    pendingAmount: 1500,
    status: 'Pending',
    parentPhone: '+919685712345',
  },
];

export default function FeeManagePage() {
  const [records, setRecords] = useState<FeeRecord[]>(initialFeeRecords);
  const [selectedYear, setSelectedYear] = useState('2026 - 2027');
  const [selectedClass, setSelectedClass] = useState('Playgroup');
  const [activeTab, setActiveTab] = useState<'Pending' | 'Completed'>('Pending');
  const [reminderToast, setReminderToast] = useState<string | null>(null);
  const [activeReceiptRecord, setActiveReceiptRecord] = useState<FeeRecord | null>(null);

  const classPills = ['Playgroup', 'Nursery', 'jr kg', 'sr kg'];

  const filteredRecords = records.filter((r) => {
    const matchesClass = r.classType.toLowerCase() === selectedClass.toLowerCase();
    const matchesStatus = r.status === activeTab;
    return matchesClass && matchesStatus;
  });

  const pendingCount = records.filter(
    (r) => r.classType.toLowerCase() === selectedClass.toLowerCase() && r.status === 'Pending',
  ).length;

  const completedCount = records.filter(
    (r) => r.classType.toLowerCase() === selectedClass.toLowerCase() && r.status === 'Completed',
  ).length;

  const handleMarkCollected = (id: string) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              paidAmount: r.totalAmount,
              pendingAmount: 0,
              status: 'Completed',
            }
          : r,
      ),
    );
  };

  const handleSendReminder = (record: FeeRecord) => {
    setReminderToast(`WhatsApp fee reminder sent to ${record.name} (${record.parentPhone})`);
    setTimeout(() => {
      setReminderToast(null);
    }, 3000);
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Fee manage' }]} />

      {/* Title & Year Filter Row (Matching Figma Screen 4) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Fee manage
          </h1>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Track tuition fee collections, outstanding balances, and parent receipts.
          </p>
        </div>

        {/* Year Filter Dropdown */}
        <div className="relative self-start sm:self-auto">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="cursor-pointer appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2 pr-9 text-xs font-semibold text-gray-800 shadow-2xs hover:border-black focus:outline-hidden sm:text-sm"
          >
            <option value="2026 - 2027">Academic Year: 2026 - 2027</option>
            <option value="2025 - 2026">Academic Year: 2025 - 2026</option>
            <option value="2024 - 2025">Academic Year: 2024 - 2025</option>
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* 3 Metric / Stat Cards (Matching Figma Screen 4) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Card 1: Collected this year */}
        <div className="rounded-2xl bg-[#F4F5F7] p-5 transition-all hover:shadow-xs sm:p-6">
          <div className="text-xs font-medium text-gray-600">Collected · this year</div>
          <div className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            ₹41,82,000
          </div>
          <div className="mt-2 text-xs font-semibold text-emerald-600">78% of ₹53.6L target</div>
        </div>

        {/* Card 2: Collected October */}
        <div className="rounded-2xl bg-[#F4F5F7] p-5 transition-all hover:shadow-xs sm:p-6">
          <div className="text-xs font-medium text-gray-600">Collected · October</div>
          <div className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            ₹1,82,000
          </div>
          <button
            type="button"
            className="mt-2 block text-xs font-semibold text-gray-600 underline hover:text-black"
          >
            View Monthly collection
          </button>
        </div>

        {/* Card 3: Pending */}
        <div className="rounded-2xl bg-[#F4F5F7] p-5 transition-all hover:shadow-xs sm:p-6">
          <div className="text-xs font-medium text-gray-600">Pending</div>
          <div className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            ₹51,82,000
          </div>
          <div className="mt-2 text-xs font-semibold text-rose-600">5 students overdue</div>
        </div>
      </div>

      {/* Class Filter Pills (Matching Figma Screen 4) */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pt-2 pb-1 sm:flex-wrap">
        {classPills.map((cls) => {
          const isActive = selectedClass.toLowerCase() === cls.toLowerCase();
          return (
            <button
              key={cls}
              type="button"
              onClick={() => setSelectedClass(cls)}
              className={`shrink-0 rounded-full px-5 py-2 text-xs font-semibold capitalize transition-all sm:text-sm ${
                isActive
                  ? 'bg-black text-white shadow-xs'
                  : 'border border-gray-300 bg-white text-gray-800 hover:border-black hover:bg-gray-50'
              }`}
            >
              {cls}
            </button>
          );
        })}
      </div>

      {/* Sub Tabs: Pending(20) vs Completed(30) (Matching Figma Screen 4) */}
      <div className="flex items-center gap-8 border-b border-gray-200/80 text-sm font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('Pending')}
          className={`relative pb-3 transition-colors ${
            activeTab === 'Pending' ? 'font-bold text-black' : 'text-gray-500 hover:text-black'
          }`}
        >
          Pending({pendingCount})
          {activeTab === 'Pending' && (
            <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-black" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('Completed')}
          className={`relative pb-3 transition-colors ${
            activeTab === 'Completed' ? 'font-bold text-black' : 'text-gray-500 hover:text-black'
          }`}
        >
          Completed({completedCount})
          {activeTab === 'Completed' && (
            <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-black" />
          )}
        </button>
      </div>

      {/* Student Fee Records Table (Matching Figma Screen 4) */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xs">
        {filteredRecords.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm font-medium text-gray-500">
              No {activeTab.toLowerCase()} fee records for {selectedClass}.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full min-w-[680px] text-left text-sm">
                <tbody className="divide-y divide-gray-100">
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="group transition-colors hover:bg-gray-50/70">
                      {/* Student Name */}
                      <td className="py-4 pr-3 pl-4 font-bold text-gray-900 group-hover:text-black sm:pl-6">
                        {record.name}
                      </td>

                      {/* Term */}
                      <td className="px-3 py-4 text-xs font-medium text-gray-600">{record.term}</td>

                      {/* Total Amount */}
                      <td className="px-3 py-4 font-mono text-xs text-gray-700">
                        Total amount : ₹{record.totalAmount}
                      </td>

                      {/* Paid Amount */}
                      <td className="px-3 py-4 font-mono text-xs font-semibold text-emerald-700">
                        paid amount : ₹{record.paidAmount}
                      </td>

                      {/* Pending Amount */}
                      <td className="px-3 py-4 font-mono text-xs font-semibold text-rose-600">
                        Pending amount : ₹{record.pendingAmount}
                      </td>

                      {/* Action Buttons: Download receipt, Reminder, Collected (Matching Figma Screen 4) */}
                      <td className="py-4 pr-4 pl-3 text-right sm:pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveReceiptRecord(record)}
                            className="rounded-full bg-black px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-gray-800 active:scale-95"
                          >
                            Download receipt
                          </button>

                          {record.status === 'Pending' && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleSendReminder(record)}
                                className="rounded-full bg-black px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-gray-800 active:scale-95"
                              >
                                Reminder
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMarkCollected(record.id)}
                                className="rounded-full bg-black px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-gray-800 active:scale-95"
                              >
                                Collected
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="divide-y divide-gray-100 sm:hidden">
              {filteredRecords.map((record) => (
                <div key={record.id} className="space-y-3 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-gray-900">{record.name}</div>
                      <div className="text-xs text-gray-500">
                        {record.term} · {record.classType}
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                        record.status === 'Completed'
                          ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border border-amber-200 bg-amber-50 text-amber-700'
                      }`}
                    >
                      {record.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 rounded-xl bg-gray-50 p-2.5 text-center text-xs">
                    <div>
                      <div className="text-[10px] text-gray-400">Total</div>
                      <div className="font-mono font-bold text-gray-800">₹{record.totalAmount}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400">Paid</div>
                      <div className="font-mono font-bold text-emerald-600">
                        ₹{record.paidAmount}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400">Pending</div>
                      <div className="font-mono font-bold text-rose-600">
                        ₹{record.pendingAmount}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveReceiptRecord(record)}
                      className="flex-1 rounded-full border border-gray-300 bg-white py-2 text-center text-xs font-semibold text-gray-800 shadow-2xs transition active:scale-95"
                    >
                      Receipt
                    </button>
                    {record.status === 'Pending' && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSendReminder(record)}
                          className="flex-1 rounded-full bg-black py-2 text-center text-xs font-semibold text-white shadow-2xs transition active:scale-95"
                        >
                          Reminder
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMarkCollected(record.id)}
                          className="flex-1 rounded-full bg-black py-2 text-center text-xs font-semibold text-white shadow-2xs transition active:scale-95"
                        >
                          Collected
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Reminder Toast Feedback */}
      {reminderToast && (
        <div className="animate-in fade-in slide-in-from-bottom-2 fixed right-6 bottom-20 z-50 flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs text-white shadow-xl">
          <BellRing className="h-4 w-4 text-emerald-400" />
          <span>{reminderToast}</span>
        </div>
      )}

      {/* Receipt Preview & Print Modal */}
      {activeReceiptRecord && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-gray-700" />
                <h3 className="text-base font-bold text-gray-900">Fee Payment Receipt</h3>
              </div>
              <button
                onClick={() => setActiveReceiptRecord(null)}
                className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-2 rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-4 text-xs">
              <div className="border-b border-gray-200 pb-2 text-center">
                <h4 className="text-sm font-extrabold text-gray-900">Bubbly Preschool</h4>
                <p className="text-[11px] text-gray-500">Official Tuition Fee Receipt</p>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-gray-500">Receipt No:</span>
                <span className="font-mono font-bold">REC-2026-089</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Student Name:</span>
                <span className="font-bold text-gray-900">{activeReceiptRecord.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Class:</span>
                <span className="capitalize">{activeReceiptRecord.classType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fee Term:</span>
                <span>{activeReceiptRecord.term}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-sm font-bold">
                <span>Paid Amount:</span>
                <span className="font-mono text-emerald-700">
                  ₹{activeReceiptRecord.paidAmount}
                </span>
              </div>
              {activeReceiptRecord.pendingAmount > 0 && (
                <div className="flex justify-between font-semibold text-rose-600">
                  <span>Pending Amount:</span>
                  <span className="font-mono">₹{activeReceiptRecord.pendingAmount}</span>
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="flex items-center gap-1.5 rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <Printer className="h-3.5 w-3.5" />
                Print
              </button>
              <button
                type="button"
                onClick={() => setActiveReceiptRecord(null)}
                className="rounded-full bg-black px-5 py-2 text-xs font-semibold text-white transition hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
