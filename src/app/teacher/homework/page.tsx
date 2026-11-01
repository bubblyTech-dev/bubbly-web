'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { ArrowLeft, Plus, Calendar } from 'lucide-react';

interface HomeworkItem {
  id: string;
  title: string;
  classType: string;
  subject: string;
  dueDate: string;
  description: string;
  submittedCount: number;
  totalStudents: number;
}

const initialHomework: HomeworkItem[] = [
  {
    id: 'hw-1',
    title: 'Coloring Activity: The Happy Sun & Rain Cloud',
    classType: 'Jr KG A',
    subject: 'Creative Arts',
    dueDate: 'Tomorrow, 9:00 AM',
    description:
      'Use bright yellow crayon for sun and sky blue for raindrops in worksheet page 14.',
    submittedCount: 16,
    totalStudents: 20,
  },
  {
    id: 'hw-2',
    title: 'Trace Letter B & Draw 2 Objects Starting with B',
    classType: 'Jr KG A',
    subject: 'English Phonics',
    dueDate: '04 Nov 2026',
    description: 'Trace uppercase B and lowercase b 5 times each. Draw a ball and a butterfly.',
    submittedCount: 12,
    totalStudents: 20,
  },
];

export default function TeacherHomeworkPage() {
  const [homeworkList, setHomeworkList] = useState<HomeworkItem[]>(initialHomework);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Creative Arts');
  const [newDueDate, setNewDueDate] = useState('Tomorrow, 9:00 AM');
  const [newDesc, setNewDesc] = useState('');

  const handleAddHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: HomeworkItem = {
      id: `hw-${Date.now()}`,
      title: newTitle,
      classType: 'Jr KG A',
      subject: newSubject,
      dueDate: newDueDate,
      description: newDesc || 'Preschool learning worksheet activity.',
      submittedCount: 0,
      totalStudents: 20,
    };

    setHomeworkList([newItem, ...homeworkList]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Breadcrumbs
        items={[{ label: 'Teacher', href: paths.teacher.dashboard }, { label: 'Homework' }]}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={paths.teacher.dashboard}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-2xs transition hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Class Homework & Activities
            </h1>
            <p className="mt-0.5 text-xs text-gray-500">Jr KG A · Preschool Home Assignments</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 self-start rounded-full bg-black px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-gray-800 active:scale-95 sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Home work</span>
        </button>
      </div>

      <div className="space-y-4">
        {homeworkList.map((hw) => (
          <div
            key={hw.id}
            className="rounded-2xl border border-gray-100 bg-[#F4F5F7] p-5 shadow-2xs transition hover:shadow-xs"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="inline-block rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-gray-700">
                  {hw.subject}
                </span>
                <h3 className="mt-2 text-base font-extrabold text-gray-900">{hw.title}</h3>
                <p className="mt-1 text-xs text-gray-600">{hw.description}</p>
              </div>

              <div className="flex items-center gap-2 self-start rounded-full bg-white px-3 py-1 font-mono text-xs font-semibold text-gray-700 sm:self-auto">
                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                <span>Due: {hw.dueDate}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-200/80 pt-3 text-xs">
              <span className="text-gray-500">
                Submitted:{' '}
                <strong className="text-emerald-700">
                  {hw.submittedCount} / {hw.totalStudents}
                </strong>
              </span>
              <button type="button" className="font-bold text-gray-900 underline hover:text-black">
                Review Submissions
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Homework Modal */}
      {isModalOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="animate-in zoom-in-95 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-base font-bold text-gray-900">Add Home Work / Activity</h3>
            <p className="text-xs text-gray-500">
              Assign fun learning task to Jr KG A preschoolers
            </p>

            <form onSubmit={handleAddHomework} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="mb-1 block font-semibold text-gray-700">Activity Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Coloring Alphabet Letter C"
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-xs focus:border-black focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-700">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 p-2.5 text-xs focus:border-black focus:outline-hidden"
                  >
                    <option>Creative Arts</option>
                    <option>English Phonics</option>
                    <option>Mathematics & Numbers</option>
                    <option>Sensory & Nature</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-gray-700">Due Date</label>
                  <input
                    type="text"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    placeholder="Tomorrow, 9:00 AM"
                    className="w-full rounded-xl border border-gray-300 p-2.5 text-xs focus:border-black focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">Instructions</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Guide parents on how to assist child with this worksheet..."
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-xs focus:border-black focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-black px-5 py-2 text-xs font-semibold text-white shadow-xs"
                >
                  Publish Homework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
