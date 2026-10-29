'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import {
  Download,
  FileText,
  SlidersHorizontal,
  Check,
  X,
  Phone,
  Mail,
  Calendar,
} from 'lucide-react';

interface Enquiry {
  id: string;
  name: string;
  relation: string;
  classType: string;
  phone: string;
  email: string;
  date: string;
  status: 'New' | 'Contacted' | 'Follow-up' | 'Converted' | 'Closed';
  notes?: string;
}

const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-1',
    name: 'Pallavi Dave',
    relation: 'Parent of Aditya',
    classType: 'Nursery',
    phone: '+919685775896',
    email: 'pallavidave58335457@gmail.com',
    date: '20/01/2026',
    status: 'New',
    notes: 'Interested in morning batch. Asked about transportation and fee structure.',
  },
  {
    id: 'enq-2',
    name: 'Rohan Mehta',
    relation: 'Parent of Kiara',
    classType: 'Playgroup',
    phone: '+919876543210',
    email: 'rohan.mehta@gmail.com',
    date: '19/01/2026',
    status: 'New',
    notes: 'Prefers 9:00 AM slot. Requested school campus tour.',
  },
  {
    id: 'enq-3',
    name: 'Bhavna Patel',
    relation: 'Parent of Vivaan',
    classType: 'jr kg',
    phone: '+919428012345',
    email: 'bhavna.patel88@gmail.com',
    date: '18/01/2026',
    status: 'Contacted',
    notes: 'Called on 19 Jan. Shared prospectus and fee breakdown on WhatsApp.',
  },
  {
    id: 'enq-4',
    name: 'Kavita Joshi',
    relation: 'Parent of Anaya',
    classType: 'sr kg',
    phone: '+919123456789',
    email: 'kavita.joshi@outlook.com',
    date: '17/01/2026',
    status: 'Follow-up',
    notes: 'Follow-up scheduled on Saturday for document verification.',
  },
  {
    id: 'enq-5',
    name: 'Sneha Shah',
    relation: 'Parent of Reyansh',
    classType: 'Nursery',
    phone: '+919898011223',
    email: 'sneha.shah@gmail.com',
    date: '16/01/2026',
    status: 'Converted',
    notes: 'Admission confirmed! First sem fees paid.',
  },
  {
    id: 'enq-6',
    name: 'Manoj Trivedi',
    relation: 'Parent of Dhruv',
    classType: 'Playgroup',
    phone: '+919712398765',
    email: 'manoj.trivedi@yahoo.com',
    date: '15/01/2026',
    status: 'Closed',
    notes: 'Relocated to another city.',
  },
];

export default function InquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [selectedStatus, setSelectedStatus] = useState<string>('New');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [activeNotesEnquiry, setActiveNotesEnquiry] = useState<Enquiry | null>(null);
  const [moveMenuEnquiryId, setMoveMenuEnquiryId] = useState<string | null>(null);

  const statusOptions = ['New', 'Contacted', 'Follow-up', 'Converted', 'Closed'];
  const classOptions = ['All', 'Playgroup', 'Nursery', 'jr kg', 'sr kg'];

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    const matchesClass =
      selectedClass === 'All' || item.classType.toLowerCase() === selectedClass.toLowerCase();
    return matchesStatus && matchesClass;
  });

  const handleMoveStatus = (enquiryId: string, newStatus: Enquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === enquiryId ? { ...item, status: newStatus } : item)),
    );
    setMoveMenuEnquiryId(null);
  };

  const handleDownloadExcel = () => {
    const headers = ['Name', 'Relation', 'Class', 'Phone', 'Email', 'Date', 'Status', 'Notes'];
    const rows = filteredEnquiries.map((e) => [
      e.name,
      e.relation,
      e.classType,
      e.phone,
      e.email,
      e.date,
      e.status,
      `"${e.notes || ''}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bubbly_admission_enquiries_${selectedStatus.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Admission enquires' }]} />

      {/* Page Title */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Admission enquires
          </h1>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Track and manage prospective student admissions for Bubbly Preschool.
          </p>
        </div>
      </div>

      {/* Status Filter Pills (Matching Figma Screen 2) */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {statusOptions.map((status) => {
          const isActive = selectedStatus === status;
          const count = enquiries.filter((e) => e.status === status).length;

          return (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedStatus(status)}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all sm:text-sm ${
                isActive
                  ? 'bg-black text-white shadow-xs'
                  : 'border border-gray-300 bg-white text-gray-800 hover:border-black hover:bg-gray-50'
              }`}
            >
              {status}
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

      {/* Secondary Filter Tabs & Download Button (Matching Figma Screen 2) */}
      <div className="flex flex-col gap-3 border-b border-gray-200/80 pb-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Class Tabs */}
        <div className="flex items-center gap-6 overflow-x-auto text-sm font-medium">
          {classOptions.map((cls) => {
            const isActive = selectedClass === cls;
            return (
              <button
                key={cls}
                type="button"
                onClick={() => setSelectedClass(cls)}
                className={`relative py-1 capitalize transition-colors ${
                  isActive ? 'font-bold text-black' : 'text-gray-500 hover:text-black'
                }`}
              >
                {cls}
                {isActive && (
                  <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-black" />
                )}
              </button>
            );
          })}
        </div>

        {/* Download in Excel Button */}
        <button
          type="button"
          onClick={handleDownloadExcel}
          className="flex items-center justify-center gap-2 self-start rounded-full border border-gray-300 bg-white px-4 py-1.5 text-xs font-semibold text-gray-800 shadow-2xs transition hover:border-black hover:bg-gray-50 sm:self-auto sm:text-sm"
        >
          <Download className="h-4 w-4" />
          <span>Download in excel</span>
        </button>
      </div>

      {/* Table / List View (Matching Figma Screen 2) */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-2xs">
        {filteredEnquiries.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm font-medium text-gray-500">
              No enquiries found in {selectedStatus} for {selectedClass}.
            </p>
            <button
              onClick={() => {
                setSelectedStatus('All');
                setSelectedClass('All');
              }}
              className="mt-3 text-xs font-semibold text-black underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-gray-100">
              {filteredEnquiries.map((enquiry) => (
                <tr key={enquiry.id} className="group transition-colors hover:bg-gray-50/70">
                  {/* Name & Relation */}
                  <td className="py-4 pr-3 pl-4 sm:pl-6">
                    <div className="font-bold text-gray-900 group-hover:text-black">
                      {enquiry.name}
                    </div>
                    <div className="text-xs text-gray-500">{enquiry.relation}</div>
                  </td>

                  {/* Class */}
                  <td className="px-3 py-4 text-xs font-medium text-gray-700 capitalize">
                    {enquiry.classType}
                  </td>

                  {/* Phone */}
                  <td className="px-3 py-4 font-mono text-xs text-gray-700">
                    <a
                      href={`tel:${enquiry.phone}`}
                      className="flex items-center gap-1 hover:underline"
                    >
                      {enquiry.phone}
                    </a>
                  </td>

                  {/* Email */}
                  <td className="px-3 py-4 text-xs text-gray-600">
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="block max-w-[200px] truncate hover:underline"
                    >
                      {enquiry.email}
                    </a>
                  </td>

                  {/* Date */}
                  <td className="px-3 py-4 font-mono text-xs text-gray-500">{enquiry.date}</td>

                  {/* Action Icons & Move Button */}
                  <td className="py-4 pr-4 pl-3 text-right sm:pr-6">
                    <div className="relative flex items-center justify-end gap-2">
                      {/* Note / Details Icon */}
                      <button
                        type="button"
                        onClick={() => setActiveNotesEnquiry(enquiry)}
                        aria-label="View notes"
                        className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-black"
                        title="View Enquiry Notes"
                      >
                        <FileText className="h-4 w-4" />
                      </button>

                      {/* Sliders / Action Icon */}
                      <button
                        type="button"
                        onClick={() =>
                          setMoveMenuEnquiryId(moveMenuEnquiryId === enquiry.id ? null : enquiry.id)
                        }
                        aria-label="Settings"
                        className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-black"
                        title="Change Status"
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                      </button>

                      {/* Move Button */}
                      <button
                        type="button"
                        onClick={() =>
                          setMoveMenuEnquiryId(moveMenuEnquiryId === enquiry.id ? null : enquiry.id)
                        }
                        className="rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-gray-800 active:scale-95"
                      >
                        Move
                      </button>

                      {/* Move Status Popover Menu */}
                      {moveMenuEnquiryId === enquiry.id && (
                        <div className="animate-in fade-in zoom-in-95 absolute top-10 right-0 z-30 w-44 rounded-xl border border-gray-100 bg-white p-2 text-left shadow-xl">
                          <div className="px-2 py-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                            Move Status To
                          </div>
                          {statusOptions.map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => handleMoveStatus(enquiry.id, st as Enquiry['status'])}
                              className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs transition ${
                                enquiry.status === st
                                  ? 'bg-black font-semibold text-white'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              <span>{st}</span>
                              {enquiry.status === st && <Check className="h-3 w-3" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Notes / Details Drawer Modal */}
      {activeNotesEnquiry && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">{activeNotesEnquiry.name}</h3>
                <p className="text-xs text-gray-500">
                  {activeNotesEnquiry.relation} · Seeking {activeNotesEnquiry.classType}
                </p>
              </div>
              <button
                onClick={() => setActiveNotesEnquiry(null)}
                className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="font-mono">{activeNotesEnquiry.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{activeNotesEnquiry.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>Enquiry Date: {activeNotesEnquiry.date}</span>
              </div>

              <div className="mt-3 rounded-xl bg-gray-50 p-3">
                <span className="mb-1 block font-semibold text-gray-900">Follow-up Notes:</span>
                <p className="leading-relaxed text-gray-600">
                  {activeNotesEnquiry.notes || 'No notes added yet.'}
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setActiveNotesEnquiry(null)}
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
