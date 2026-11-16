'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Eye, Search, UserPlus } from 'lucide-react';

import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { LoginLinkBox } from '@/components/common/LoginLinkBox';
import { Modal } from '@/components/common/Modal';
import { EmptyBlock, ErrorBlock, LoadingBlock } from '@/components/common/States';
import { useToast } from '@/components/common/Toast';
import { paths } from '@/config/paths';
import { StudentFormModal } from '@/features/students/StudentFormModal';
import { useApiData } from '@/hooks/useApiData';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { errorMessage } from '@/lib/api/errors';
import { formatDate, initials } from '@/lib/format';
import { classService, studentService } from '@/services/school';
import type { Student } from '@/types/school';

export default function ClassDetailPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = use(params);
  const [searchQuery, setSearchQuery] = useState('');
  const search = useDebouncedValue(searchQuery.trim());

  const {
    data: classInfo,
    error: classError,
    reload: reloadClass,
  } = useApiData(() => classService.get(classId), [classId]);
  const { data: classOptions } = useApiData(() => classService.options(), []);
  const {
    data: roster,
    loading,
    error,
    reload,
  } = useApiData(
    () => studentService.list({ classUuid: classId, search: search || undefined }),
    [classId, search],
  );
  const { toast, show } = useToast();

  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [adding, setAdding] = useState(false);
  const [newLink, setNewLink] = useState<{ url: string; who: string } | null>(null);

  const students = roster?.data ?? [];
  const refresh = () => {
    void reload();
    void reloadClass();
  };

  if (classError && !classInfo) {
    return (
      <div className="space-y-6">
        <Breadcrumbs
          items={[{ label: 'Class', href: paths.workspace.classes }, { label: 'Not found' }]}
        />
        <ErrorBlock message={classError} onRetry={() => void reloadClass()} />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Breadcrumbs
        items={[
          { label: 'Class', href: paths.workspace.classes },
          { label: classInfo?.name ?? '…' },
        ]}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={paths.workspace.classes}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-2xs transition hover:bg-gray-100"
            aria-label="Back to Classes"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {classInfo?.name ?? '…'} ({classInfo?.studentCount ?? students.length})
            </h1>
            <p className="mt-0.5 text-xs text-gray-500">
              Class roster, parent contacts, and student records.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {classInfo?.classTeacher ? (
            <Link
              href={paths.workspace.teacherDetail(classInfo.classTeacher.uuid)}
              className="group flex items-center justify-between gap-2.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-800 shadow-2xs transition hover:border-black hover:bg-gray-50 sm:text-sm"
            >
              <span>Teacher: {classInfo.classTeacher.name}</span>
              <Eye className="h-4 w-4 text-gray-500 transition group-hover:text-black" />
            </Link>
          ) : (
            <span className="rounded-full border border-dashed border-gray-300 px-4 py-2 text-xs text-gray-500">
              No class teacher yet
            </span>
          )}
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white shadow-2xs transition hover:bg-gray-800 sm:text-sm"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add student</span>
          </button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search student or parent name..."
          className="w-full rounded-full border border-gray-300 bg-white py-2 pr-4 pl-9 text-xs shadow-2xs focus:border-black focus:outline-hidden"
        />
      </div>

      {newLink ? <LoginLinkBox url={newLink.url} who={newLink.who} /> : null}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xs">
        {loading && !roster ? (
          <LoadingBlock />
        ) : error && !roster ? (
          <div className="p-4">
            <ErrorBlock message={error} onRetry={() => void reload()} />
          </div>
        ) : students.length === 0 ? (
          <EmptyBlock>
            {search ? 'No students found.' : 'No students in this class yet.'}
          </EmptyBlock>
        ) : (
          <div className="divide-y divide-gray-100">
            {students.map((student) => (
              <div
                key={student.uuid}
                className="group flex flex-col justify-between gap-3 p-4 transition-colors hover:bg-gray-50/70 sm:flex-row sm:items-center sm:px-6"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] text-xs font-bold text-gray-600 shadow-inner">
                    {initials(student.name)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 group-hover:text-black">
                      {student.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Parent:{' '}
                      <span className="font-medium text-gray-700">
                        {student.guardianName ?? '—'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 pl-14 text-xs text-gray-600 sm:pl-0">
                  <div className="flex items-center gap-1.5 font-mono">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    <span>DOB: {formatDate(student.dateOfBirth)}</span>
                  </div>
                  {student.bloodGroup ? (
                    <span className="hidden rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-700 md:inline-block">
                      {student.bloodGroup}
                    </span>
                  ) : null}
                </div>

                <div className="flex items-center justify-end gap-2 pl-14 sm:pl-0">
                  <button
                    type="button"
                    onClick={() => setEditingStudent(student)}
                    className="rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-gray-800 active:scale-95"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      show(
                        `Chat with ${student.guardianName ?? 'the parent'} opens with the Chat module (Phase C).`,
                      )
                    }
                    className="rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-gray-800 active:scale-95"
                  >
                    Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStudent(student)}
                    aria-label="View student details"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:border-black hover:text-black"
                    title="View Student Record"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeStudent ? (
        <StudentDetailsModal
          student={activeStudent}
          onClose={() => setActiveStudent(null)}
          onChanged={(updated, link) => {
            setActiveStudent(updated);
            if (link) setNewLink({ url: link, who: updated.guardianName ?? updated.name });
            refresh();
          }}
          onRemoved={(message) => {
            setActiveStudent(null);
            show(message);
            refresh();
          }}
        />
      ) : null}

      {editingStudent || adding ? (
        <StudentFormModal
          student={editingStudent}
          classes={
            classOptions ?? (classInfo ? [{ uuid: classInfo.uuid, name: classInfo.name }] : [])
          }
          defaultClassUuid={classId}
          onClose={() => {
            setEditingStudent(null);
            setAdding(false);
          }}
          onSave={async (input) => {
            if (editingStudent) {
              await studentService.update(editingStudent.uuid, input);
              show('Student updated.');
            } else {
              const result = await studentService.create(input);
              setNewLink(
                result.setPasswordUrl
                  ? {
                      url: result.setPasswordUrl,
                      who: result.student.guardianName ?? result.student.name,
                    }
                  : null,
              );
              show('Student added.');
            }
            setEditingStudent(null);
            setAdding(false);
            refresh();
          }}
        />
      ) : null}

      {toast}
    </div>
  );
}

function StudentDetailsModal({
  student,
  onClose,
  onChanged,
  onRemoved,
}: {
  student: Student;
  onClose: () => void;
  onChanged: (student: Student, setPasswordUrl?: string) => void;
  onRemoved: (message: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<'left' | 'delete' | null>(null);

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await action();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const login = student.parentLogin;
  const rows: [string, string][] = [
    [
      'Parent / Guardian:',
      [student.guardianName, student.guardianRelation && `(${student.guardianRelation})`]
        .filter(Boolean)
        .join(' ') || '—',
    ],
    ['Contact Number:', student.guardianPhone ?? '—'],
    ['Email:', student.guardianEmail ?? '—'],
    ['Date of Birth:', formatDate(student.dateOfBirth)],
    ['Blood Group:', student.bloodGroup ?? '—'],
    ['Admission No.:', student.admissionNo ?? '—'],
    ['Class Teacher:', student.classTeacher?.name ?? '—'],
  ];

  return (
    <Modal
      open
      onClose={onClose}
      size="sm"
      title={
        <span className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
            {initials(student.name)}
          </span>
          <span>
            <span className="block text-sm font-bold text-gray-900">{student.name}</span>
            <span className="block text-xs font-normal text-gray-500">
              {student.class?.name ?? 'No class'} Student
            </span>
          </span>
        </span>
      }
    >
      <div className="space-y-2.5 text-xs text-gray-600">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3 border-b border-gray-100 py-1">
            <span className="shrink-0 text-gray-400">{label}</span>
            <span className="text-right font-semibold break-all text-gray-900">{value}</span>
          </div>
        ))}
        {student.medicalNotes ? (
          <div className="rounded-lg bg-amber-50 px-2.5 py-2 text-amber-900">
            <span className="font-semibold">Medical: </span>
            {student.medicalNotes}
          </div>
        ) : null}

        <div className="rounded-xl bg-gray-50 p-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">Parent app login</span>
            <span className="text-[11px] text-gray-500">
              {login
                ? login.passwordSet
                  ? `Active · ${login.email}`
                  : `Invited · ${login.email}`
                : 'Not created'}
            </span>
          </div>
          <button
            type="button"
            disabled={busy || student.status !== 1}
            onClick={() =>
              void run(async () => {
                const result = await studentService.parentLogin(student.uuid);
                onChanged(result.student, result.setPasswordUrl);
              })
            }
            className="mt-2 w-full rounded-full border border-black bg-white py-1.5 text-[11px] font-bold text-black transition hover:bg-black hover:text-white disabled:opacity-50"
          >
            {login ? 'Send a new login link' : 'Create parent login'}
          </button>
          {!login && !student.guardianEmail ? (
            <p className="mt-1 text-[10px] text-gray-400">Add the parent email (Edit) first.</p>
          ) : null}
        </div>

        {error ? (
          <div className="rounded-lg bg-rose-50 px-2.5 py-2 text-rose-700">{error}</div>
        ) : null}
      </div>

      <div className="mt-5 flex items-center justify-between gap-2">
        {confirm ? (
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-gray-600">
              {confirm === 'left' ? 'Mark as left?' : 'Delete for good?'}
            </span>
            <button
              type="button"
              disabled={busy}
              onClick={() =>
                void run(async () => {
                  if (confirm === 'left') {
                    await studentService.changeStatus(student.uuid, 3);
                    onRemoved(`${student.name} was marked as left.`);
                  } else {
                    await studentService.remove(student.uuid);
                    onRemoved(`${student.name} was deleted.`);
                  }
                })
              }
              className="rounded-full bg-rose-600 px-3 py-1 font-semibold text-white hover:bg-rose-700"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setConfirm(null)}
              className="font-semibold text-gray-600 hover:underline"
            >
              No
            </button>
          </div>
        ) : (
          <div className="flex gap-3 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setConfirm('left')}
              className="text-gray-600 hover:underline"
            >
              Mark as left
            </button>
            <button
              type="button"
              onClick={() => setConfirm('delete')}
              className="text-rose-600 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-black px-5 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-800"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
