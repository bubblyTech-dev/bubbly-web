'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { Edit2, School } from 'lucide-react';

import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { CancelButton, Modal, ModalActions } from '@/components/common/Modal';
import { ErrorBlock, LoadingBlock } from '@/components/common/States';
import { SelectField, SubmitButton, TextField } from '@/components/form/Field';
import { paths } from '@/config/paths';
import { useApiData } from '@/hooks/useApiData';
import { useAsyncAction, type FieldErrorMap } from '@/hooks/useAsyncAction';
import { formatTimeRange } from '@/lib/format';
import { classService, teacherService } from '@/services/school';
import type { ClassInput, Ref, SchoolClass } from '@/types/school';

interface ClassForm {
  name: string;
  classTeacherUuid: string;
  room: string;
  startsAt: string;
  endsAt: string;
  capacity: string;
}

const emptyForm: ClassForm = {
  name: '',
  classTeacherUuid: '',
  room: '',
  startsAt: '',
  endsAt: '',
  capacity: '',
};

const toForm = (c: SchoolClass): ClassForm => ({
  name: c.name,
  classTeacherUuid: c.classTeacher?.uuid ?? '',
  room: c.room ?? '',
  startsAt: c.startsAt ?? '',
  endsAt: c.endsAt ?? '',
  capacity: c.capacity === null ? '' : String(c.capacity),
});

const toInput = (form: ClassForm): ClassInput => ({
  name: form.name.trim(),
  classTeacherUuid: form.classTeacherUuid || null,
  room: form.room.trim() || null,
  startsAt: form.startsAt || null,
  endsAt: form.endsAt || null,
  capacity: form.capacity === '' ? null : Number(form.capacity),
});

export default function ClassesPage() {
  const { data, loading, error, reload } = useApiData(() => classService.list(), []);
  const { data: teachers } = useApiData(() => teacherService.options(), []);
  const [editing, setEditing] = useState<SchoolClass | null>(null);
  const [adding, setAdding] = useState(false);

  const classList = data?.data ?? [];
  const totalStudents = data?.meta.totalStudents ?? 0;

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Breadcrumbs items={[{ label: 'Classes' }]} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Class({classList.length})
        </h1>
        <div className="text-sm font-bold text-gray-900 sm:text-base">
          Total students :{totalStudents}
        </div>
      </div>

      {loading && !data ? (
        <LoadingBlock />
      ) : error && !data ? (
        <ErrorBlock message={error} onRetry={() => void reload()} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {classList.map((cls) => (
            <div
              key={cls.uuid}
              className="group flex min-h-[170px] flex-col justify-between rounded-2xl bg-[#F4F5F7] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Link
                href={paths.workspace.classDetail(cls.uuid)}
                className="block flex-1 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-semibold text-gray-700 capitalize group-hover:text-black">
                    {cls.name}
                  </h2>
                  <span className="text-[10px] font-semibold text-gray-400 group-hover:text-black">
                    View Roster →
                  </span>
                </div>
                <div className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  {cls.studentCount ?? 0}
                </div>
                {cls.room || cls.startsAt ? (
                  <div className="mt-1 truncate text-[11px] text-gray-400">
                    {[cls.room, formatTimeRange(cls.startsAt, cls.endsAt)]
                      .filter(Boolean)
                      .join(' · ')}
                  </div>
                ) : null}
              </Link>

              <div className="mt-6 flex items-center justify-between border-t border-gray-200/60 pt-3 text-xs">
                <span className="max-w-[130px] truncate text-gray-500">
                  {cls.classTeacher?.name ?? 'To be assigned'}
                </span>
                <button
                  type="button"
                  onClick={() => setEditing(cls)}
                  className="flex cursor-pointer items-center gap-1 font-bold text-gray-900 hover:text-black hover:underline"
                >
                  <span>Edit</span>
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setAdding(true)}
            className="group flex min-h-[170px] flex-col justify-between rounded-2xl border border-transparent bg-[#F4F5F7] p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-[#ECEEF2] hover:shadow-md"
          >
            <div>
              <span className="text-xs font-medium text-gray-500">new</span>
            </div>
            <div className="my-auto flex items-center gap-2">
              <span className="text-2xl font-extrabold text-gray-900 group-hover:text-black sm:text-3xl">
                + Add class
              </span>
            </div>
            <div className="border-t border-transparent pt-3 text-xs text-gray-400">
              Create level & section
            </div>
          </button>
        </div>
      )}

      {editing ? (
        <ClassFormModal
          key={editing.uuid}
          title={`Edit Class: ${editing.name}`}
          icon={<Edit2 className="h-4 w-4 text-gray-700" />}
          initial={toForm(editing)}
          initialTeacher={editing.classTeacher ?? null}
          teachers={teachers ?? []}
          submitLabel="Save Changes"
          onClose={() => setEditing(null)}
          onSubmit={(form) => classService.update(editing.uuid, toInput(form))}
          submitSuccess="Class updated."
          onDelete={() => classService.remove(editing.uuid)}
          onDone={() => {
            setEditing(null);
            reload();
          }}
          studentCount={editing.studentCount ?? 0}
        />
      ) : null}

      {adding ? (
        <ClassFormModal
          title="Add New Class"
          icon={<School className="h-5 w-5 text-gray-700" />}
          initial={emptyForm}
          teachers={teachers ?? []}
          submitLabel="Create Class"
          onClose={() => setAdding(false)}
          onSubmit={(form) => classService.create(toInput(form))}
          submitSuccess="Class added."
          onDone={() => {
            setAdding(false);
            reload();
          }}
        />
      ) : null}
    </div>
  );
}

/** Add or edit a class. The API calls come from the page; this modal runs them with the shared error handling. */
function ClassFormModal({
  title,
  icon,
  initial,
  initialTeacher = null,
  teachers,
  submitLabel,
  onClose,
  onSubmit,
  submitSuccess,
  onDelete,
  onDone,
  studentCount = 0,
}: {
  title: string;
  icon: ReactNode;
  initial: ClassForm;
  initialTeacher?: Ref | null;
  teachers: Ref[];
  submitLabel: string;
  onClose: () => void;
  onSubmit: (form: ClassForm) => Promise<unknown>;
  submitSuccess: string;
  onDelete?: () => Promise<unknown>;
  onDone: () => void;
  studentCount?: number;
}) {
  const [form, setForm] = useState<ClassForm>(initial);
  const [errors, setErrors] = useState<FieldErrorMap>({});
  const { run, pending: saving } = useAsyncAction();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const set = (field: keyof ClassForm) => (event: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (await run(() => onSubmit(form), { success: submitSuccess, onValidation: setErrors }))
      onDone();
  };

  const remove = async () => {
    if (onDelete && (await run(onDelete, { success: 'Class deleted.' }))) onDone();
  };

  // the picker always shows the current teacher, even before the options have loaded
  const teacherOptions = [...teachers];
  if (initialTeacher && !teacherOptions.some((t) => t.uuid === initialTeacher.uuid))
    teacherOptions.unshift(initialTeacher);

  return (
    <Modal open onClose={onClose} title={title} icon={icon}>
      <form onSubmit={(event) => void submit(event)} className="space-y-3 text-xs" noValidate>
        <TextField
          label="Class / Group Name *"
          required
          placeholder="e.g. Daycare Toddlers / Activity Wing"
          value={form.name}
          onChange={set('name')}
          error={errors.name}
        />
        <SelectField
          label="Class Teacher"
          value={form.classTeacherUuid}
          onChange={set('classTeacherUuid')}
          error={errors.classTeacherUuid}
        >
          <option value="">To be assigned</option>
          {teacherOptions.map((t) => (
            <option key={t.uuid} value={t.uuid}>
              {t.name}
            </option>
          ))}
        </SelectField>
        <div className="grid grid-cols-2 gap-3">
          <TextField
            label="Room"
            placeholder="Room 101"
            value={form.room}
            onChange={set('room')}
            error={errors.room}
          />
          <TextField
            label="Capacity / Seats"
            type="number"
            min={0}
            value={form.capacity}
            onChange={set('capacity')}
            error={errors.capacity}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <TextField
            label="Starts at"
            type="time"
            value={form.startsAt}
            onChange={set('startsAt')}
            error={errors.startsAt}
          />
          <TextField
            label="Ends at"
            type="time"
            value={form.endsAt}
            onChange={set('endsAt')}
            error={errors.endsAt}
          />
        </div>

        {onDelete ? (
          <div className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-[11px] text-gray-600">
            {studentCount > 0 ? (
              <span>This class has {studentCount} active students, so it cannot be deleted.</span>
            ) : confirmDelete ? (
              <span className="flex items-center justify-between gap-2">
                <span>Delete this class for good?</span>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => void remove()}
                  className="rounded-full bg-rose-600 px-3 py-1 font-semibold text-white hover:bg-rose-700"
                >
                  Yes, delete
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="font-semibold text-rose-600 hover:underline"
              >
                Delete class
              </button>
            )}
          </div>
        ) : null}

        <ModalActions>
          <CancelButton onClick={onClose} />
          <SubmitButton loading={saving} className="px-5 py-1.5 text-xs">
            {submitLabel}
          </SubmitButton>
        </ModalActions>
      </form>
    </Modal>
  );
}
