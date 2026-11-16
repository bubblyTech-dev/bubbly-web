'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Check, KeyRound, School } from 'lucide-react';

import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ErrorBlock, LoadingBlock } from '@/components/common/States';
import { useToast } from '@/components/common/Toast';
import { SelectField, TextField } from '@/components/form/Field';
import { paths } from '@/config/paths';
import { useApiData } from '@/hooks/useApiData';
import { ApiError, errorMessage } from '@/lib/api/errors';
import { formatMonthYear, formatTimeRange, formatWorkingDays } from '@/lib/format';
import { useAuth } from '@/providers/AuthProvider';
import { schoolService, profileService } from '@/services/school';
import type { SchoolOverview, Usage } from '@/types/school';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const WEEKDAYS = [
  [1, 'Mon'],
  [2, 'Tue'],
  [3, 'Wed'],
  [4, 'Thu'],
  [5, 'Fri'],
  [6, 'Sat'],
  [7, 'Sun'],
] as const;
const INTERVAL: Record<number, string> = { 1: 'monthly', 2: 'quarterly', 3: 'annually' };
const SUBSCRIPTION_STATUS: Record<number, string> = {
  1: 'Pending',
  2: 'Active',
  3: 'Past due',
  4: 'Cancelled',
  5: 'Expired',
  6: 'Suspended',
};

export default function ProfilePage() {
  const { data, loading, error, reload, setData } = useApiData(() => schoolService.get(), []);

  if (loading && !data) return <LoadingBlock className="py-32" />;
  if (error && !data) return <ErrorBlock message={error} onRetry={() => void reload()} />;
  if (!data) return null;

  return <ProfileView overview={data} onSchoolSaved={(school) => setData({ ...data, school })} />;
}

function ProfileView({
  overview,
  onSchoolSaved,
}: {
  overview: SchoolOverview;
  onSchoolSaved: (school: SchoolOverview['school']) => void;
}) {
  const { me, reload: reloadMe } = useAuth();
  const { toast, show } = useToast();
  const { school, subscription, usage } = overview;

  const [form, setForm] = useState({
    schoolName: school.name,
    principalName: me?.user.name ?? '',
    contactPhone: school.contactPhone ?? '',
    opensAt: school.opensAt ?? '',
    closesAt: school.closesAt ?? '',
    academicYearStartMonth: String(school.academicYearStartMonth),
  });
  const [workingDays, setWorkingDays] = useState<number[]>(school.workingDays);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const set = (field: keyof typeof form) => (event: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    setErrors({});
    setSaving(true);
    try {
      const saved = await schoolService.update({
        name: form.schoolName.trim(),
        contactPhone: form.contactPhone.trim() || null,
        opensAt: form.opensAt || null,
        closesAt: form.closesAt || null,
        workingDays,
        academicYearStartMonth: Number(form.academicYearStartMonth),
      });
      if (form.principalName.trim() && form.principalName.trim() !== me?.user.name) {
        await profileService.update({ name: form.principalName.trim() });
        await reloadMe();
      }
      onSchoolSaved(saved);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (err) {
      if (err instanceof ApiError && err.status === 422) {
        const fields = Object.fromEntries(
          Object.entries(err.fieldErrors).map(([k, v]) => [k, v[0]]),
        );
        setErrors({ ...fields, schoolName: fields.name });
      } else show(errorMessage(err), 'error');
    } finally {
      setSaving(false);
    }
  };

  const statusLabel = subscription.status ? SUBSCRIPTION_STATUS[subscription.status] : 'No plan';

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Breadcrumbs items={[{ label: 'Profile' }]} />

      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Profile
        </h1>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Manage school configuration, subscription entitlements, and principal administrator
          credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <form
            onSubmit={handleSave}
            className="space-y-4 rounded-2xl border border-gray-100 bg-[#FBFBFC] p-6 shadow-2xs"
            noValidate
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
              <TextField
                label="Preschool Name"
                value={form.schoolName}
                onChange={set('schoolName')}
                error={errors.schoolName}
              />
              <TextField
                label="Principal / Admin Name"
                value={form.principalName}
                onChange={set('principalName')}
              />
              <TextField
                label="Contact Phone"
                type="tel"
                value={form.contactPhone}
                onChange={set('contactPhone')}
                error={errors.contactPhone}
                className="font-mono"
              />
              <TextField
                label="Administrative Email"
                type="email"
                value={me?.user.email ?? ''}
                disabled
                hint="This is your login. Contact Bubbly support to change it."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-3 text-xs sm:grid-cols-2">
              <div>
                <SelectField
                  label="Academic Year starts in"
                  value={form.academicYearStartMonth}
                  onChange={set('academicYearStartMonth')}
                  error={errors.academicYearStartMonth}
                >
                  {MONTHS.map((month, index) => (
                    <option key={month} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </SelectField>
                <p className="mt-1 font-mono text-[11px] text-gray-500">
                  Current: {school.academicYear ?? '—'} (Active)
                </p>
              </div>

              <div>
                <span className="mb-1 block text-xs font-semibold text-gray-700">
                  School Working Hours
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="time"
                    aria-label="Opens at"
                    value={form.opensAt}
                    onChange={set('opensAt')}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                  />
                  <input
                    type="time"
                    aria-label="Closes at"
                    value={form.closesAt}
                    onChange={set('closesAt')}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                  />
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {WEEKDAYS.map(([day, label]) => {
                    const on = workingDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        aria-pressed={on}
                        onClick={() =>
                          setWorkingDays((prev) =>
                            on ? prev.filter((d) => d !== day) : [...prev, day].sort(),
                          )
                        }
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition ${
                          on
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 bg-white text-gray-600 hover:border-black'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-1 text-[11px] text-gray-500">
                  {formatWorkingDays(school.workingDays)} (
                  {formatTimeRange(school.opensAt, school.closesAt) || 'hours not set'})
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                href={paths.auth.changePassword}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-black hover:underline"
              >
                <KeyRound className="h-3.5 w-3.5" /> Change password
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-1.5 rounded-full bg-black px-6 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-gray-800 active:scale-95 disabled:opacity-60"
              >
                {isSaved ? <Check className="h-4 w-4" /> : null}
                <span>{saving ? 'Saving…' : isSaved ? 'Saved!' : 'Save Changes'}</span>
              </button>
            </div>
          </form>

          <div className="rounded-2xl border border-gray-100 bg-[#FBFBFC] p-6 shadow-2xs">
            <h2 className="mb-1 text-sm font-bold text-gray-900">Bubbly Ecosystem Apps</h2>
            <p className="mb-4 text-xs text-gray-500">
              Status of the 3 integrated apps for {school.name}.
            </p>
            <div className="space-y-3 text-xs">
              <AppRow
                dot="bg-emerald-500"
                title="1. Principal Admin Web"
                text="Dashboard, Enquiries, Fees, Leaves, Classes"
                badge="Active"
                tone="emerald"
              />
              <AppRow
                dot="bg-amber-500"
                title="2. Teacher App"
                text={`${usage.teachers.used ?? 0} teachers · Attendance, Activities, Timetable & Notes`}
                badge="Active"
                tone="amber"
              />
              <AppRow
                dot="bg-blue-500"
                title="3. Parent App"
                text="Fee tracking, Kid Updates & Leave Submissions"
                badge="Active"
                tone="blue"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4 rounded-2xl border border-gray-100 bg-[#F4F5F7] p-6 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-600">SaaS Plan</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white ${subscription.allowed ? 'bg-black' : 'bg-rose-600'}`}
              >
                {statusLabel}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-gray-900">
                {subscription.planName ?? 'No plan'}
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                {subscription.billingInterval
                  ? `Billed ${INTERVAL[subscription.billingInterval] ?? ''}`
                  : 'Not billed yet'}
                {subscription.currentPeriodEnd
                  ? ` · ${subscription.cancelAtCycleEnd ? 'Ends' : 'Renews'} ${formatMonthYear(subscription.currentPeriodEnd)}`
                  : ''}
              </p>
            </div>

            <div className="space-y-3 border-t border-gray-200/80 pt-3 text-xs">
              <UsageBar label="Student Entitlement:" usage={usage.students} />
              <UsageBar label="Teacher Accounts:" usage={usage.teachers} />
              <UsageBar label="Classes:" usage={usage.classes} />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() =>
                  show(
                    'Online billing and invoices arrive with the subscription self-service screens.',
                  )
                }
                className="w-full rounded-full border border-black bg-white py-2 text-xs font-bold text-black shadow-2xs transition hover:bg-black hover:text-white"
              >
                Manage Subscription
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast}
    </div>
  );
}

function UsageBar({ label, usage }: { label: string; usage: Usage }) {
  const used = usage.used ?? 0;
  const percent = usage.limit ? Math.min(100, Math.round((used / usage.limit) * 100)) : 0;
  return (
    <div>
      <div className="mb-1 flex justify-between font-semibold">
        <span>{label}</span>
        <span>
          {used} / {usage.limit ?? '∞'}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full ${percent >= 90 ? 'bg-rose-600' : 'bg-black'}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function AppRow({
  dot,
  title,
  text,
  badge,
  tone,
}: {
  dot: string;
  title: string;
  text: string;
  badge: string;
  tone: 'emerald' | 'amber' | 'blue';
}) {
  const badgeClass = {
    emerald: 'bg-emerald-100 text-emerald-800',
    amber: 'bg-amber-100 text-amber-800',
    blue: 'bg-blue-100 text-blue-800',
  }[tone];
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3">
      <div className="flex items-center gap-3">
        <div className={`h-2.5 w-2.5 rounded-full ${dot}`} />
        <div>
          <span className="block font-bold text-gray-900">{title}</span>
          <span className="text-gray-500">{text}</span>
        </div>
      </div>
      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${badgeClass}`}>
        {badge}
      </span>
    </div>
  );
}
