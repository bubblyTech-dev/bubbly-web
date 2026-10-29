'use client';

import { useState } from 'react';
import { X, UserPlus, CreditCard, School, Users, Megaphone, Check } from 'lucide-react';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAction?: 'inquiry' | 'fee' | 'class' | 'teacher' | 'announcement';
}

export function QuickAddModal({ isOpen, onClose, defaultAction = 'inquiry' }: QuickAddModalProps) {
  const [activeTab, setActiveTab] = useState<
    'inquiry' | 'fee' | 'class' | 'teacher' | 'announcement'
  >(defaultAction);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs transition-opacity">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
              +
            </span>
            <h3 className="text-lg font-bold text-gray-900">Quick Add</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="my-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('inquiry')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === 'inquiry'
                ? 'bg-black text-white'
                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <UserPlus className="h-3.5 w-3.5" />
            Enquiry
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fee')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === 'fee'
                ? 'bg-black text-white'
                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <CreditCard className="h-3.5 w-3.5" />
            Fee Payment
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('class')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === 'class'
                ? 'bg-black text-white'
                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <School className="h-3.5 w-3.5" />
            Class
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('teacher')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === 'teacher'
                ? 'bg-black text-white'
                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            Teacher
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('announcement')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === 'announcement'
                ? 'bg-black text-white'
                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Megaphone className="h-3.5 w-3.5" />
            Announcement
          </button>
        </div>

        {submitted ? (
          <div className="animate-in zoom-in-95 py-12 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Check className="h-7 w-7" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">Saved Successfully!</h4>
            <p className="mt-1 text-sm text-gray-500">Record has been added to Bubbly system.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {activeTab === 'inquiry' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Parent Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Pallavi Dave"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Child Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Aditya Dave"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Seeking Class *
                    </label>
                    <select
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                    >
                      <option value="Playgroup">Playgroup</option>
                      <option value="Nursery">Nursery</option>
                      <option value="Jr KG">Jr KG</option>
                      <option value="Sr KG">Sr KG</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="parent@example.com"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                  />
                </div>
              </>
            )}

            {activeTab === 'fee' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Student Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Pallavi Dave / Aditya"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">Class *</label>
                    <select
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                    >
                      <option value="Playgroup">Playgroup</option>
                      <option value="Nursery">Nursery</option>
                      <option value="Jr KG">Jr KG</option>
                      <option value="Sr KG">Sr KG</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">Term *</label>
                    <select
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                    >
                      <option value="First sem">First sem</option>
                      <option value="Second sem">Second sem</option>
                      <option value="Annual">Annual Full Fee</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Amount (₹) *
                    </label>
                    <input
                      required
                      type="number"
                      placeholder="1200"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Payment Mode
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden">
                    <option value="UPI">UPI / Online</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer / NEFT</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
              </>
            )}

            {activeTab === 'class' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Class Level *
                    </label>
                    <select
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                    >
                      <option value="Playgroup">Playgroup</option>
                      <option value="Nursery">Nursery</option>
                      <option value="Jr KG">Jr KG</option>
                      <option value="Sr KG">Sr KG</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Section *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Section A"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Class Teacher Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Ms. Megha Sharma"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                  />
                </div>
              </>
            )}

            {activeTab === 'teacher' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Teacher Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ananya Gupta"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Primary Class *
                    </label>
                    <select
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                    >
                      <option value="Playgroup">Playgroup</option>
                      <option value="Nursery">Nursery</option>
                      <option value="Jr KG">Jr KG</option>
                      <option value="Sr KG">Sr KG</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 00000"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      placeholder="teacher@bubbly.school"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'announcement' && (
              <>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Announcement Title *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Annual Sports Day & Picnic announcement"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Target Audience *
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden">
                    <option value="All">All School (Teachers & Parents)</option>
                    <option value="Teachers">Teachers Only</option>
                    <option value="Playgroup">Playgroup Parents</option>
                    <option value="Nursery">Nursery Parents</option>
                    <option value="Jr KG">Jr KG Parents</option>
                    <option value="Sr KG">Sr KG Parents</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Message Content *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Write details for parents and teachers..."
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                  />
                </div>
              </>
            )}

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-black px-6 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-gray-800"
              >
                Save Record
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
