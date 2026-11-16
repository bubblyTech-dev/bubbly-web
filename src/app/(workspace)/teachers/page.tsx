'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Check, Search, UserCheck, UserPlus } from 'lucide-react';

import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { LoginLinkBox } from '@/components/common/LoginLinkBox';
import { CancelButton, Modal, ModalActions } from '@/components/common/Modal';
import { EmptyBlock, ErrorBlock, LoadingBlock } from '@/components/common/States';
import { useToast } from '@/components/common/Toast';
import { SubmitButton, TextField } from '@/components/form/Field';
import { paths } from '@/config/paths';
import { useApiData } from '@/hooks/useApiData';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { ApiError, errorMessage } from '@/lib/api/errors';
import { initials } from '@/lib/format';
import { classService, teacherService } from '@/services/school';
import { STAFF_ATTENDANCE, type Teacher } from '@/types/school';

const ATTENDANCE_CHOICES = [
  { status: STAFF_ATTENDANCE.PRESENT, label: 'Present' },
  { status: STAFF_ATTENDANCE.LATE, label: 'Late' },
  { status: STAFF_ATTENDANCE.ABSENT, label: 'Absent' },
  { status: STAFF_ATTENDANCE.ON_LEAVE, label: 'On Leave' },
];

const dotClass = (status: number | undefined) =>
  status === STAFF_ATTENDANCE.PRESENT
    ? 'bg-emerald-500'
    : status === STAFF_ATTENDANCE.ON_LEAVE || status === STAFF_ATTENDANCE.ABSENT
      ? 'bg-rose-500'
      : status
        ? 'bg-amber-500'
        : 'bg-gray-300';

const classLabel = (teacher: Teacher) =>
  teacher.classes?.length
    ? `Class:${teacher.classes.map((c) => c.name.toLowerCase()).join(', ')}`
    : 'No class';

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const search = useDebouncedValue(searchQuery.trim());
  const { data, loading, error, reload, setData } = useApiData(
    () => teacherService.list({ search: search || undefined }),
    [search],
  );
  const { toast, show } = useToast();

  const [attendanceFor, setAttendanceFor] = useState<Teacher | null>(null);
  const [adding, setAdding] = useState(false);
  const [newLink, setNewLink] = useState<{ url: string; who: string } | null>(null);

  const teachers = data?.data ?? [];

  const replaceTeacher = (updated: Teacher) =>
    setData((prev) =>
      prev
        ? {
            ...prev,
            data: prev.data.map((t) => (t.uuid === updated.uuid ? { ...t, ...updated } : t)),
          }
        : prev,
    );

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Breadcrumbs items={[{ label: 'Teacher' }]} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Teacher({data?.meta.total ?? teachers.length})
          </h1>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Faculty roster, classroom assignments, daily attendance, and profiles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search teacher..."
              className="w-full rounded-full border border-gray-300 bg-white py-1.5 pr-4 pl-8 text-xs shadow-2xs focus:border-black focus:outline-hidden"
            />
          </div>
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-gray-800"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>Add teacher</span>
          </button>
        </div>
      </div>

      {newLink ? <LoginLinkBox url={newLink.url} who={newLink.who} /> : null}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xs">
        {loading && !data ? (
          <LoadingBlock />
        ) : error && !data ? (
          <div className="p-4">
            <ErrorBlock message={error} onRetry={() => void reload()} />
          </div>
        ) : teachers.length === 0 ? (
          <EmptyBlock>
            {search ? 'No teachers found.' : 'No teachers yet. Add your first teacher.'}
          </EmptyBlock>
        ) : (
          <div className="divide-y divide-gray-100">
            {teachers.map((teacher) => (
              <div
                key={teacher.uuid}
                className="group flex flex-col justify-between gap-3 p-4 transition-colors hover:bg-gray-50/70 sm:flex-row sm:items-center sm:px-6"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] text-xs font-bold text-gray-600 shadow-inner">
                    {initials(teacher.name ?? teacher.email)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 group-hover:text-black">
                      {teacher.name}
                    </div>
                    <div className="text-xs text-gray-400 sm:hidden">{classLabel(teacher)}</div>
                    {!teacher.passwordSet ? (
                      <div className="text-[10px] font-semibold text-amber-600">Invite pending</div>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pl-14 text-xs text-gray-700 sm:gap-8 sm:pl-0">
                  <span className="hidden font-medium text-gray-600 sm:inline">
                    {classLabel(teacher)}
                  </span>
                  <span className="font-medium text-gray-600">{teacher.designation}</span>
                  <button
                    type="button"
                    onClick={() => setAttendanceFor(teacher)}
                    className="flex items-center gap-1 font-semibold text-gray-800 underline transition hover:text-black"
                    title={teacher.todayAttendance?.label ?? 'Not marked today'}
                  >
                    <span>Attendance</span>
                    <span
                      className={`h-2 w-2 rounded-full ${dotClass(teacher.todayAttendance?.status)}`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2 pl-14 sm:pl-0">
                  <Link
                    href={paths.workspace.teacherDetail(teacher.uuid)}
                    className="rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-gray-800 active:scale-95"
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      show(`Chat with ${teacher.name} opens with the Chat module (Phase C).`)
                    }
                    className="rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-gray-800 active:scale-95"
                  >
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {attendanceFor ? (
        <AttendanceModal
          teacher={attendanceFor}
          onClose={() => setAttendanceFor(null)}
          onSaved={(updated) => {
            replaceTeacher(updated);
            setAttendanceFor(updated);
          }}
        />
      ) : null}

      {adding ? (
        <AddTeacherModal
          onClose={() => setAdding(false)}
          onCreated={(teacher, url) => {
            setAdding(false);
            setNewLink({ url, who: teacher.name ?? teacher.email });
            show('Teacher added.');
            void reload();
          }}
        />
      ) : null}

      {toast}
    </div>
  );
}

function AttendanceModal({
  teacher,
  onClose,
  onSaved,
}: {
  teacher: Teacher;
  onClose: () => void;
  onSaved: (teacher: Teacher) => void;
}) {
  // the list has no month summary: load the full record
  const { data: detail, setData: setDetail } = useApiData(
    () => teacherService.get(teacher.uuid),
    [teacher.uuid],
  );
  const [saving, setSaving] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const current = teacher.todayAttendance?.status;
  const summary = detail?.monthSummary;

  const mark = async (status: number) => {
    setSaving(status);
    setError(null);
    try {
      const result = await teacherService.markAttendance(teacher.uuid, { status });
      const updated = {
        ...teacher,
        todayAttendance: { status: result.status, label: result.label, note: result.note },
      };
      if (detail) setDetail({ ...detail, monthSummary: result.monthSummary });
      onSaved(updated);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSaving(null);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      size="sm"
      title={`Mark Attendance: ${teacher.name}`}
      icon={<UserCheck className="h-5 w-5 text-gray-700" />}
    >
      <div className="space-y-3 text-xs">
        <p className="text-gray-500">
          Select today&apos;s attendance status for{' '}
          <strong className="text-gray-900">{teacher.name}</strong> ({classLabel(teacher)}):
        </p>

        <div className="grid grid-cols-2 gap-2">
          {ATTENDANCE_CHOICES.map(({ status, label }) => (
            <button
              key={status}
              type="button"
              disabled={saving !== null}
              onClick={() => void mark(status)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-xs font-bold transition disabled:opacity-60 ${
                current === status
                  ? 'border-black bg-black text-white shadow-xs'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{saving === status ? 'Saving…' : label}</span>
              {current === status ? <Check className="h-3.5 w-3.5" /> : null}
            </button>
          ))}
        </div>

        {error ? (
          <div className="rounded-lg bg-rose-50 px-2.5 py-2 text-rose-700">{error}</div>
        ) : null}

        <div className="mt-3 rounded-xl bg-gray-50 p-3 text-gray-600">
          <div className="flex justify-between py-0.5">
            <span>Monthly Attendance:</span>
            <span className="font-bold text-gray-900">
              {summary?.presentPercent === null || summary?.presentPercent === undefined
                ? '—'
                : `${summary.presentPercent}%`}
            </span>
          </div>
          <div className="flex justify-between py-0.5">
            <span>Present Days:</span>
            <span className="font-mono font-semibold text-emerald-700">
              {summary ? `${summary.present} days` : '—'}
            </span>
          </div>
          <div className="flex justify-between py-0.5">
            <span>Leaves Taken:</span>
            <span className="font-mono font-semibold text-rose-600">
              {summary ? `${summary.onLeave} days` : '—'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-black px-5 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-800"
        >
          Done
        </button>
      </div>
    </Modal>
  );
}

function AddTeacherModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (teacher: Teacher, url: string) => void;
}) {
  const { data: classes } = useApiData(() => classService.options(), []);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    joiningDate: '',
    classUuid: '',
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const set = (field: keyof typeof form) => (event: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setErrors({});
    setFormError(null);
    setSaving(true);
    try {
      const result = await teacherService.create({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        qualification: form.qualification.trim() || null,
        joiningDate: form.joiningDate || null,
        classUuids: form.classUuid ? [form.classUuid] : [],
      });
      onCreated(result.teacher, result.setPasswordUrl);
    } catch (err) {
      if (err instanceof ApiError && err.status === 422) {
        setErrors(Object.fromEntries(Object.entries(err.fieldErrors).map(([k, v]) => [k, v[0]])));
      } else setFormError(errorMessage(err));
      setSaving(false);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Add Teacher"
      icon={<UserPlus className="h-5 w-5 text-gray-700" />}
    >
      <form onSubmit={submit} className="space-y-3 text-xs" noValidate>
        {formError ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-rose-700">
            {formError}
          </div>
        ) : null}
        <TextField
          label="Full Name *"
          required
          value={form.name}
          onChange={set('name')}
          error={errors.name}
        />
        <TextField
          label="Email (login) *"
          type="email"
          required
          value={form.email}
          onChange={set('email')}
          error={errors.email}
          hint="The teacher gets a link at this email to set their password."
        />
        <div className="grid grid-cols-2 gap-3">
          <TextField
            label="Phone Number"
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            error={errors.phone}
          />
          <TextField
            label="Joining Date"
            type="date"
            value={form.joiningDate}
            onChange={set('joiningDate')}
            error={errors.joiningDate}
          />
        </div>
        <TextField
          label="Qualification"
          value={form.qualification}
          onChange={set('qualification')}
          error={errors.qualification}
        />
        <div>
          <label
            className="mb-1 block text-xs font-semibold text-gray-700"
            htmlFor="add-teacher-class"
          >
            Class Teacher of
          </label>
          <select
            id="add-teacher-class"
            value={form.classUuid}
            onChange={set('classUuid')}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-hidden"
          >
            <option value="">No class yet</option>
            {(classes ?? []).map((c) => (
              <option key={c.uuid} value={c.uuid}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.classUuids ? (
            <p className="mt-1 text-[11px] font-medium text-rose-600">{errors.classUuids}</p>
          ) : null}
        </div>
        <ModalActions>
          <CancelButton onClick={onClose} />
          <SubmitButton loading={saving} className="px-5 py-1.5 text-xs">
            Add Teacher
          </SubmitButton>
        </ModalActions>
      </form>
    </Modal>
  );
}
