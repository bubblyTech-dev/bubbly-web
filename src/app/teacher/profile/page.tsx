'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { Check } from 'lucide-react';

export default function TeacherProfilePage() {
  const [saved, setSaved] = useState(false);
  const [phone, setPhone] = useState('+91 96857 75896');
  const [email, setEmail] = useState('brij.teacher@bubbly.school');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Breadcrumbs
        items={[{ label: 'Teacher', href: paths.teacher.dashboard }, { label: 'Profile' }]}
      />

      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Teacher Profile
        </h1>
        <p className="mt-0.5 text-xs text-gray-500">Class Teacher details & account credentials</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-[#FBFBFC] p-6 text-center shadow-2xs">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-black text-3xl font-extrabold text-white shadow-md">
            BR
          </div>
          <h2 className="text-lg font-bold text-gray-900">Brij</h2>
          <span className="text-xs text-gray-500">Preschool Class Teacher</span>
          <span className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-800">
            Assigned: Jr KG A
          </span>

          <div className="mt-6 w-full space-y-2.5 border-t border-gray-200/80 pt-4 text-left text-xs text-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Class Room:</span>
              <span className="font-semibold text-gray-800">Room 103</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Total Students:</span>
              <span className="font-semibold text-gray-800">20 Students</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="font-semibold text-emerald-600">Active Faculty</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form
            onSubmit={handleSave}
            className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 text-xs shadow-2xs"
          >
            <h3 className="border-b border-gray-100 pb-2 text-sm font-bold text-gray-900">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  defaultValue="Brij"
                  disabled
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">Designation</label>
                <input
                  type="text"
                  defaultValue="Class Teacher (Early Childhood)"
                  disabled
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 font-mono text-xs focus:border-black focus:outline-hidden"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs focus:border-black focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-full bg-black px-6 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-gray-800"
              >
                {saved ? <Check className="h-4 w-4" /> : null}
                <span>{saved ? 'Saved!' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
