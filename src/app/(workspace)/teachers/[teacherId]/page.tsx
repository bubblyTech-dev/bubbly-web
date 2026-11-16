'use client';

import { use, useState, type FormEvent } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  Clock,
  Edit2,
  GraduationCap,
  KeyRound,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
} from 'lucide-react';

import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { LoginLinkBox } from '@/components/common/LoginLinkBox';
import { ErrorBlock, LoadingBlock } from '@/components/common/States';
import { useToast } from '@/components/common/Toast';
import { SubmitButton, TextField } from '@/components/form/Field';
import { paths } from '@/config/paths';
import { useApiData } from '@/hooks/useApiData';
import { ApiError, errorMessage } from '@/lib/api/errors';
import { formatMonthYear, formatTimeRange, initials } from '@/lib/format';
import { classService, teacherService } from '@/services/school';
import type { Teacher } from '@/types/school';

export default function TeacherProfilePage({ params }: { params: Promise<{ teacherId: string }> }) {
  const { teacherId } = use(params);
  const {
    data: teacher,
    loading,
    error,
    reload,
    setData,
  } = useApiData(() => teacherService.get(teacherId), [teacherId]);
  const { toast, show } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (loading && !teacher) return <LoadingBlock className="py-32" />;
  if (error || !teacher) {
    return (
      <div className="space-y-6">
        <Breadcrumbs
          items={[{ label: 'Teacher', href: paths.workspace.teachers }, { label: 'Main profile' }]}
        />
        <ErrorBlock message={error ?? 'Teacher not found.'} onRetry={() => void reload()} />
      </div>
    );
  }

  const classNames = teacher.classes?.length
    ? teacher.classes.map((c) => c.name).join(', ')
    : 'No class';
  const attendance = teacher.todayAttendance;
  const summary = teacher.monthSummary;
  const active = teacher.status === 1;

  const act = async (action: () => Promise<void>) => {
    setBusy(true);
    try {
      await action();
    } catch (err) {
      show(errorMessage(err), 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Breadcrumbs
        items={[{ label: 'Teacher', href: paths.workspace.teachers }, { label: 'Main profile' }]}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={paths.workspace.teachers}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-2xs transition hover:bg-gray-100"
            aria-label="Back to Teachers"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {teacher.name}
            </h1>
            <p className="mt-0.5 text-xs text-gray-500">
              {teacher.designation} · Class:{classNames.toLowerCase()}
              {!active ? ' · Inactive' : ''}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => show(`Chat with ${teacher.name} opens with the Chat module (Phase C).`)}
            className="flex items-center gap-1.5 rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-gray-800"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Message</span>
          </button>
          <button
            type="button"
            onClick={() => setIsEditMode(!isEditMode)}
            className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-1.5 text-xs font-semibold text-gray-800 transition hover:border-black hover:bg-gray-50"
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>{isEditMode ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {link ? <LoginLinkBox url={link} who={teacher.name ?? teacher.email} /> : null}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: avatar and summary */}
        <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-[#FBFBFC] p-6 text-center shadow-2xs">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-black text-3xl font-extrabold text-white shadow-md">
            {initials(teacher.name ?? teacher.email)}
          </div>
          <h2 className="text-lg font-bold text-gray-900">{teacher.name}</h2>
          <span className="mt-0.5 text-xs text-gray-500">{teacher.designation}</span>
          <span className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-800">
            Class:{classNames.toLowerCase()}
          </span>

          <div className="mt-6 w-full space-y-3 border-t border-gray-200/80 pt-4 text-left text-xs text-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Status:</span>
              <span
                className={`font-semibold ${
                  attendance?.status === 1 || attendance?.status === 3
                    ? 'text-emerald-600'
                    : attendance
                      ? 'text-rose-600'
                      : 'text-gray-500'
                }`}
              >
                {attendance ? `${attendance.label} Today` : 'Not marked today'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Joining Date:</span>
              <span className="font-mono">{formatMonthYear(teacher.joiningDate)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Experience:</span>
              <span className="font-semibold">
                {teacher.experienceYears === null ? '—' : `${teacher.experienceYears} years`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Login:</span>
              <span className="font-semibold">
                {teacher.passwordSet ? 'Active' : 'Invite pending'}
              </span>
            </div>
          </div>

          <div className="mt-5 flex w-full flex-col gap-2">
            {active ? (
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  void act(async () => {
                    const result = await teacherService.loginLink(teacher.uuid);
                    setLink(result.setPasswordUrl);
                  })
                }
                className="flex w-full items-center justify-center gap-1.5 rounded-full border border-black bg-white py-1.5 text-[11px] font-bold text-black transition hover:bg-black hover:text-white disabled:opacity-50"
              >
                <KeyRound className="h-3.5 w-3.5" />
                {teacher.passwordSet ? 'Send password reset link' : 'Resend login link'}
              </button>
            ) : null}
            <button
              type="button"
              disabled={busy}
              onClick={() =>
                void act(async () => {
                  const updated = await teacherService.changeStatus(teacher.uuid, active ? 2 : 1);
                  setData(updated);
                  show(active ? 'Teacher deactivated and signed out.' : 'Teacher activated.');
                })
              }
              className={`w-full rounded-full py-1.5 text-[11px] font-semibold transition disabled:opacity-50 ${
                active ? 'text-rose-600 hover:bg-rose-50' : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {active ? 'Deactivate teacher' : 'Activate teacher'}
            </button>
          </div>
        </div>

        {/* Right: details or the edit form */}
        <div className="lg:col-span-2">
          {isEditMode ? (
            <EditTeacherForm
              teacher={teacher}
              onCancel={() => setIsEditMode(false)}
              onSaved={(updated) => {
                setData(updated);
                setIsEditMode(false);
                show('Teacher profile details updated successfully!');
              }}
            />
          ) : (
            <div className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-2xs">
              <div>
                <h3 className="mb-3 border-b border-gray-100 pb-2 text-sm font-bold text-gray-900">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">Phone:</span>
                    {teacher.phone ? (
                      <a
                        href={`tel:${teacher.phone}`}
                        className="font-mono font-semibold hover:underline"
                      >
                        {teacher.phone}
                      </a>
                    ) : (
                      <span>—</span>
                    )}
                  </div>
                  <div className="flex min-w-0 items-center gap-2 text-gray-700">
                    <Mail className="h-4 w-4 shrink-0 text-gray-400" />
                    <span className="text-gray-400">Email:</span>
                    <a
                      href={`mailto:${teacher.email}`}
                      className="truncate font-semibold hover:underline"
                    >
                      {teacher.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">Emergency:</span>
                    <span className="font-mono font-semibold">
                      {teacher.emergencyContact ?? '—'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">Campus:</span>
                    <span className="font-semibold">
                      {teacher.classes
                        ?.map((c) => c.room)
                        .filter(Boolean)
                        .join(', ') || '—'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 border-b border-gray-100 pb-2 text-sm font-bold text-gray-900">
                  Academic & Professional Credentials
                </h3>
                <div className="space-y-3 text-xs text-gray-700">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <span className="block text-gray-400">Qualification:</span>
                      <span className="font-semibold text-gray-900">
                        {teacher.qualification ?? '—'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <span className="block text-gray-400">Work Shift:</span>
                      <span className="font-semibold text-gray-900">
                        {formatTimeRange(teacher.shiftStartsAt, teacher.shiftEndsAt) || '—'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 border-b border-gray-100 pb-2 text-sm font-bold text-gray-900">
                  Attendance & Leave Record (this month)
                </h3>
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="rounded-xl bg-[#F4F5F7] p-3">
                    <span className="block text-[10px] font-semibold text-gray-400 uppercase">
                      Present
                    </span>
                    <span className="text-lg font-black text-emerald-700">
                      {summary?.presentPercent === null || summary?.presentPercent === undefined
                        ? '—'
                        : `${summary.presentPercent}%`}
                    </span>
                  </div>
                  <div className="rounded-xl bg-[#F4F5F7] p-3">
                    <span className="block text-[10px] font-semibold text-gray-400 uppercase">
                      Leave Used
                    </span>
                    <span className="text-lg font-black text-rose-600">
                      {summary ? `${summary.onLeave} days` : '—'}
                    </span>
                  </div>
                  <div className="rounded-xl bg-[#F4F5F7] p-3">
                    <span className="block text-[10px] font-semibold text-gray-400 uppercase">
                      Yearly Quota
                    </span>
                    <span className="text-lg font-black text-gray-900">
                      {teacher.annualLeaveQuota === null ? '—' : `${teacher.annualLeaveQuota} days`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {toast}
    </div>
  );
}

function EditTeacherForm({
  teacher,
  onCancel,
  onSaved,
}: {
  teacher: Teacher;
  onCancel: () => void;
  onSaved: (teacher: Teacher) => void;
}) {
  const { data: classes } = useApiData(() => classService.options(), []);
  const [form, setForm] = useState({
    name: teacher.name ?? '',
    email: teacher.email,
    phone: teacher.phone ?? '',
    designation: teacher.designation ?? '',
    qualification: teacher.qualification ?? '',
    experienceYears: teacher.experienceYears === null ? '' : String(teacher.experienceYears),
    joiningDate: teacher.joiningDate ?? '',
    emergencyContact: teacher.emergencyContact ?? '',
    shiftStartsAt: teacher.shiftStartsAt ?? '',
    shiftEndsAt: teacher.shiftEndsAt ?? '',
    annualLeaveQuota: teacher.annualLeaveQuota === null ? '' : String(teacher.annualLeaveQuota),
  });
  const [classUuids, setClassUuids] = useState<string[]>(teacher.classes?.map((c) => c.uuid) ?? []);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const set = (field: keyof typeof form) => (event: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  // the teacher's current classes stay visible in the picker even before the options load
  const classOptions = [...(classes ?? [])];
  for (const c of teacher.classes ?? [])
    if (!classOptions.some((o) => o.uuid === c.uuid)) classOptions.push(c);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setErrors({});
    setFormError(null);
    setSaving(true);
    const text = (value: string) => value.trim() || null;
    try {
      const updated = await teacherService.update(teacher.uuid, {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: text(form.phone),
        designation: text(form.designation),
        qualification: text(form.qualification),
        experienceYears: form.experienceYears === '' ? null : Number(form.experienceYears),
        joiningDate: form.joiningDate || null,
        emergencyContact: text(form.emergencyContact),
        shiftStartsAt: form.shiftStartsAt || null,
        shiftEndsAt: form.shiftEndsAt || null,
        annualLeaveQuota: form.annualLeaveQuota === '' ? null : Number(form.annualLeaveQuota),
        classUuids,
      });
      onSaved(updated);
    } catch (err) {
      if (err instanceof ApiError && err.status === 422) {
        setErrors(Object.fromEntries(Object.entries(err.fieldErrors).map(([k, v]) => [k, v[0]])));
      } else setFormError(errorMessage(err));
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 text-xs shadow-2xs"
      noValidate
    >
      <h3 className="border-b border-gray-100 pb-2 text-sm font-bold text-gray-900">
        Edit Teacher Details
      </h3>
      {formError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-rose-700">
          {formError}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextField label="Full Name" value={form.name} onChange={set('name')} error={errors.name} />
        <TextField
          label="Designation"
          placeholder="Teacher / Assistant"
          value={form.designation}
          onChange={set('designation')}
          error={errors.designation}
        />
        <TextField
          label="Phone Number"
          type="tel"
          value={form.phone}
          onChange={set('phone')}
          error={errors.phone}
        />
        <TextField
          label="Email Address (login)"
          type="email"
          value={form.email}
          onChange={set('email')}
          error={errors.email}
        />
      </div>

      <div>
        <span className="mb-1 block text-xs font-semibold text-gray-700">Class Assigned</span>
        <div className="flex flex-wrap gap-2">
          {classOptions.length === 0 ? (
            <span className="text-gray-400">No classes yet.</span>
          ) : null}
          {classOptions.map((c) => {
            const checked = classUuids.includes(c.uuid);
            return (
              <button
                key={c.uuid}
                type="button"
                aria-pressed={checked}
                onClick={() =>
                  setClassUuids((prev) =>
                    checked ? prev.filter((u) => u !== c.uuid) : [...prev, c.uuid],
                  )
                }
                className={`flex items-center gap-1 rounded-full border px-3 py-1 font-semibold transition ${
                  checked
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-black'
                }`}
              >
                {checked ? <Check className="h-3 w-3" /> : null}
                {c.name}
              </button>
            );
          })}
        </div>
        <p className="mt-1 text-[11px] text-gray-400">
          A class has one class teacher: picking it here moves it from its current teacher.
        </p>
        {errors.classUuids ? (
          <p className="mt-1 text-[11px] font-medium text-rose-600">{errors.classUuids}</p>
        ) : null}
      </div>

      <TextField
        label="Qualification"
        value={form.qualification}
        onChange={set('qualification')}
        error={errors.qualification}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <TextField
          label="Experience (years)"
          type="number"
          min={0}
          step="0.5"
          value={form.experienceYears}
          onChange={set('experienceYears')}
          error={errors.experienceYears}
        />
        <TextField
          label="Joining Date"
          type="date"
          value={form.joiningDate}
          onChange={set('joiningDate')}
          error={errors.joiningDate}
        />
        <TextField
          label="Emergency Contact"
          type="tel"
          value={form.emergencyContact}
          onChange={set('emergencyContact')}
          error={errors.emergencyContact}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <TextField
          label="Shift starts"
          type="time"
          value={form.shiftStartsAt}
          onChange={set('shiftStartsAt')}
          error={errors.shiftStartsAt}
        />
        <TextField
          label="Shift ends"
          type="time"
          value={form.shiftEndsAt}
          onChange={set('shiftEndsAt')}
          error={errors.shiftEndsAt}
        />
        <TextField
          label="Leave quota (days/year)"
          type="number"
          min={0}
          value={form.annualLeaveQuota}
          onChange={set('annualLeaveQuota')}
          error={errors.annualLeaveQuota}
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-gray-300 px-4 py-1.5 font-semibold text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <SubmitButton loading={saving} className="px-5 py-1.5 text-xs">
          Save Changes
        </SubmitButton>
      </div>
    </form>
  );
}
