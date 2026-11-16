'use client';

import { useState, type FormEvent } from 'react';
import { Edit2, UserPlus } from 'lucide-react';

import { CancelButton, Modal, ModalActions } from '@/components/common/Modal';
import { SelectField, SubmitButton, TextAreaField, TextField } from '@/components/form/Field';
import { ApiError, errorMessage } from '@/lib/api/errors';
import type { Ref, Student, StudentInput } from '@/types/school';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

interface Form {
  name: string;
  classUuid: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  admissionNo: string;
  admissionDate: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  guardianEmail: string;
  address: string;
  medicalNotes: string;
  createParentLogin: boolean;
}

const fromStudent = (s: Student | null, classUuid: string): Form => ({
  name: s?.name ?? '',
  classUuid: s?.class?.uuid ?? classUuid,
  dateOfBirth: s?.dateOfBirth ?? '',
  gender: s?.gender ? String(s.gender) : '',
  bloodGroup: s?.bloodGroup ?? '',
  admissionNo: s?.admissionNo ?? '',
  admissionDate: s?.admissionDate ?? '',
  guardianName: s?.guardianName ?? '',
  guardianRelation: s?.guardianRelation ?? '',
  guardianPhone: s?.guardianPhone ?? '',
  guardianEmail: s?.guardianEmail ?? '',
  address: s?.address ?? '',
  medicalNotes: s?.medicalNotes ?? '',
  createParentLogin: false,
});

const toInput = (form: Form, isNew: boolean): StudentInput => {
  const text = (value: string) => value.trim() || null;
  return {
    name: form.name.trim(),
    classUuid: form.classUuid || null,
    dateOfBirth: form.dateOfBirth || null,
    gender: form.gender ? Number(form.gender) : null,
    bloodGroup: form.bloodGroup || null,
    admissionNo: text(form.admissionNo),
    admissionDate: form.admissionDate || null,
    guardianName: text(form.guardianName),
    guardianRelation: text(form.guardianRelation),
    guardianPhone: text(form.guardianPhone),
    guardianEmail: text(form.guardianEmail),
    address: text(form.address),
    medicalNotes: text(form.medicalNotes),
    ...(isNew ? { createParentLogin: form.createParentLogin } : {}),
  };
};

/** Add or edit a student. `onSave` gets the API input and throws ApiError on failure (shown per field). */
export function StudentFormModal({
  student,
  classes,
  defaultClassUuid = '',
  onClose,
  onSave,
}: {
  student: Student | null;
  classes: Ref[];
  defaultClassUuid?: string;
  onClose: () => void;
  onSave: (input: StudentInput) => Promise<void>;
}) {
  const isNew = !student;
  const [form, setForm] = useState<Form>(() => fromStudent(student, defaultClassUuid));
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const set = (field: keyof Form) => (event: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setErrors({});
    setFormError(null);
    setSaving(true);
    try {
      await onSave(toInput(form, isNew));
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
      size="lg"
      title={isNew ? 'Add Student' : 'Edit Student Information'}
      icon={
        isNew ? (
          <UserPlus className="h-4 w-4 text-gray-700" />
        ) : (
          <Edit2 className="h-4 w-4 text-gray-700" />
        )
      }
    >
      <form onSubmit={submit} className="space-y-4 text-xs" noValidate>
        {formError ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-rose-700">
            {formError}
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TextField
            label="Student Full Name *"
            required
            value={form.name}
            onChange={set('name')}
            error={errors.name}
          />
          <SelectField
            label="Class"
            value={form.classUuid}
            onChange={set('classUuid')}
            error={errors.classUuid}
          >
            <option value="">Not placed yet</option>
            {classes.map((c) => (
              <option key={c.uuid} value={c.uuid}>
                {c.name}
              </option>
            ))}
          </SelectField>
          <TextField
            label="Date of Birth"
            type="date"
            value={form.dateOfBirth}
            onChange={set('dateOfBirth')}
            error={errors.dateOfBirth}
          />
          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label="Gender"
              value={form.gender}
              onChange={set('gender')}
              error={errors.gender}
            >
              <option value="">—</option>
              <option value="1">Female</option>
              <option value="2">Male</option>
              <option value="3">Other</option>
            </SelectField>
            <SelectField
              label="Blood Group"
              value={form.bloodGroup}
              onChange={set('bloodGroup')}
              error={errors.bloodGroup}
            >
              <option value="">—</option>
              {BLOOD_GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </SelectField>
          </div>
          <TextField
            label="Admission No."
            value={form.admissionNo}
            onChange={set('admissionNo')}
            error={errors.admissionNo}
          />
          <TextField
            label="Admission Date"
            type="date"
            value={form.admissionDate}
            onChange={set('admissionDate')}
            error={errors.admissionDate}
          />
        </div>

        <div className="border-t border-gray-100 pt-3">
          <h4 className="mb-2 text-[11px] font-bold tracking-wide text-gray-500 uppercase">
            Parent / Guardian
          </h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextField
              label="Parent / Guardian Name"
              value={form.guardianName}
              onChange={set('guardianName')}
              error={errors.guardianName}
            />
            <TextField
              label="Relation"
              placeholder="Mother, Father, Guardian"
              value={form.guardianRelation}
              onChange={set('guardianRelation')}
              error={errors.guardianRelation}
            />
            <TextField
              label="Phone Number"
              type="tel"
              value={form.guardianPhone}
              onChange={set('guardianPhone')}
              error={errors.guardianPhone}
            />
            <TextField
              label="Email (parent app login)"
              type="email"
              value={form.guardianEmail}
              onChange={set('guardianEmail')}
              error={errors.guardianEmail}
            />
          </div>
          {isNew ? (
            <label className="mt-3 flex items-start gap-2 text-gray-700">
              <input
                type="checkbox"
                className="mt-0.5"
                checked={form.createParentLogin}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, createParentLogin: e.target.checked }))
                }
              />
              <span>
                Create the parent app login now (uses the email above; the parent gets a link to set
                a password)
              </span>
            </label>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-3 border-t border-gray-100 pt-3">
          <TextField
            label="Address"
            value={form.address}
            onChange={set('address')}
            error={errors.address}
          />
          <TextAreaField
            label="Medical notes / allergies"
            rows={2}
            value={form.medicalNotes}
            onChange={set('medicalNotes')}
            error={errors.medicalNotes}
          />
        </div>

        <ModalActions>
          <CancelButton onClick={onClose} />
          <SubmitButton loading={saving} className="px-5 py-1.5 text-xs">
            {isNew ? 'Add Student' : 'Save Changes'}
          </SubmitButton>
        </ModalActions>
      </form>
    </Modal>
  );
}
