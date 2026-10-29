'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { School, Check } from 'lucide-react';

export default function ProfilePage() {
  const [isSaved, setIsSaved] = useState(false);
  const [schoolName, setSchoolName] = useState('Bubbly Preschool (Main Branch)');
  const [principalName, setPrincipalName] = useState('Brij');
  const [phone, setPhone] = useState('+91 98250 12345');
  const [email, setEmail] = useState('principal.brij@bubbly.school');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'School Profile & Settings' }]} />

      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Preschool Profile & Settings
        </h1>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Manage school configuration, subscription entitlements, and principal administrator
          credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: School & Principal Details */}
        <div className="space-y-6 lg:col-span-2">
          <form
            onSubmit={handleSave}
            className="space-y-4 rounded-2xl border border-gray-100 bg-[#FBFBFC] p-6 shadow-2xs"
          >
            <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
              <div className="flex items-center gap-2">
                <School className="h-5 w-5 text-gray-800" />
                <h2 className="text-sm font-bold text-gray-900">Preschool Information</h2>
              </div>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                Tenant Verified
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-semibold text-gray-700">Preschool Name</label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs focus:border-black focus:outline-hidden"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">
                  Principal / Admin Name
                </label>
                <input
                  type="text"
                  value={principalName}
                  onChange={(e) => setPrincipalName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs focus:border-black focus:outline-hidden"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">Contact Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 font-mono text-xs focus:border-black focus:outline-hidden"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">
                  Administrative Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs focus:border-black focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-3 text-xs sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-semibold text-gray-700">Academic Year</label>
                <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 font-mono text-gray-800">
                  2026 - 2027 (Active)
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">
                  School Working Hours
                </label>
                <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-800">
                  Monday – Friday (8:30 AM – 2:00 PM)
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-full bg-black px-6 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-gray-800 active:scale-95"
              >
                {isSaved ? <Check className="h-4 w-4" /> : null}
                <span>{isSaved ? 'Saved!' : 'Save Changes'}</span>
              </button>
            </div>
          </form>

          {/* App Ecosystem Status */}
          <div className="rounded-2xl border border-gray-100 bg-[#FBFBFC] p-6 shadow-2xs">
            <h2 className="mb-1 text-sm font-bold text-gray-900">Bubbly Ecosystem Apps</h2>
            <p className="mb-4 text-xs text-gray-500">
              Status of the 3 integrated modules for Bubbly Preschool.
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <div>
                    <span className="block font-bold text-gray-900">1. Principal Admin Web</span>
                    <span className="text-gray-500">
                      Dashboard, Enquiries, Fees, Leaves, Classes
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <div>
                    <span className="block font-bold text-gray-900">2. Teacher App</span>
                    <span className="text-gray-500">Attendance, Activities, Timetable & Notes</span>
                  </div>
                </div>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                  Design Flow Ready
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  <div>
                    <span className="block font-bold text-gray-900">3. Parent App</span>
                    <span className="text-gray-500">
                      Fee tracking, Kid Updates & Leave Submissions
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-800">
                  Phase 2 Flow
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Subscription & Entitlements */}
        <div className="space-y-6">
          <div className="space-y-4 rounded-2xl border border-gray-100 bg-[#F4F5F7] p-6 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-600">SaaS Plan</span>
              <span className="rounded-full bg-black px-2.5 py-0.5 text-[10px] font-bold text-white">
                Active
              </span>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-gray-900">Preschool Growth Plan</h3>
              <p className="mt-1 text-xs text-gray-500">Billed annually · Auto-renews Oct 2027</p>
            </div>

            <div className="space-y-3 border-t border-gray-200/80 pt-3 text-xs">
              <div>
                <div className="mb-1 flex justify-between font-semibold">
                  <span>Student Entitlement:</span>
                  <span>524 / 600</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-black" style={{ width: '87%' }} />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between font-semibold">
                  <span>Teacher Accounts:</span>
                  <span>18 / 25</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-black" style={{ width: '72%' }} />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between font-semibold">
                  <span>Storage Used:</span>
                  <span>4.2 GB / 20 GB</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-black" style={{ width: '21%' }} />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="w-full rounded-full border border-black bg-white py-2 text-xs font-bold text-black shadow-2xs transition hover:bg-black hover:text-white"
              >
                Manage Subscription
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
