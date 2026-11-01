'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { Check } from 'lucide-react';

export default function ParentProfilePage() {
  const [saved, setSaved] = useState(false);
  const [parentPhone, setParentPhone] = useState('+91 96857 75896');
  const [parentEmail, setParentEmail] = useState('brijjj.parent@gmail.com');
  const [address, setAddress] = useState('Plot 42, Green Park Avenue, Near City Garden');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Breadcrumbs
        items={[{ label: 'Parent Portal', href: paths.parent.dashboard }, { label: 'Profile' }]}
      />

      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Family Profile
        </h1>
        <p className="mt-0.5 text-xs text-gray-500">
          Child preschool records and parent contact information
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Child Details Card */}
        <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-[#FBFBFC] p-6 text-center shadow-2xs">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-black text-3xl font-extrabold text-white shadow-md">
            AD
          </div>
          <h2 className="text-lg font-bold text-gray-900">Aditya Dave</h2>
          <span className="text-xs text-gray-500">Enrolled Student</span>
          <span className="mt-2 inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-900">
            Nursery A · Roll #12
          </span>

          <div className="mt-6 w-full space-y-2.5 border-t border-gray-200/80 pt-4 text-left text-xs text-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Date of Birth:</span>
              <span className="font-mono font-semibold">14/05/2022</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Blood Group:</span>
              <span className="font-semibold text-rose-600">B+</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Class Teacher:</span>
              <span className="font-semibold">Priya Sharma</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Bus Transport:</span>
              <span className="font-semibold text-emerald-700">Route #2 (Sector 4)</span>
            </div>
          </div>
        </div>

        {/* Parent Details Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSave}
            className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 text-xs shadow-2xs"
          >
            <h3 className="border-b border-gray-100 pb-2 text-sm font-bold text-gray-900">
              Parent / Guardian Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-semibold text-gray-700">Parent Name</label>
                <input
                  type="text"
                  defaultValue="Brijjj (Father)"
                  disabled
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">Mother Name</label>
                <input
                  type="text"
                  defaultValue="Pallavi Dave"
                  disabled
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">Emergency Phone</label>
                <input
                  type="tel"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 font-mono text-xs focus:border-black focus:outline-hidden"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs focus:border-black focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block font-semibold text-gray-700">Residential Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs focus:border-black focus:outline-hidden"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-full bg-black px-6 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-gray-800"
              >
                {saved ? <Check className="h-4 w-4" /> : null}
                <span>{saved ? 'Saved!' : 'Save Contact Details'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
