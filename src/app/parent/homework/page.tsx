'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { ArrowLeft, Check, Calendar } from 'lucide-react';

interface HomeworkTask {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  instructions: string;
  isCompleted: boolean;
}

const initialTasks: HomeworkTask[] = [
  {
    id: 't-1',
    title: 'Coloring Activity: The Happy Sun & Rain Cloud',
    subject: 'Creative Arts',
    dueDate: 'Tomorrow, 9:00 AM',
    instructions:
      'Use bright yellow crayon for sun and sky blue for raindrops in worksheet page 14.',
    isCompleted: false,
  },
  {
    id: 't-2',
    title: 'Trace Letter B & Draw 2 Objects Starting with B',
    subject: 'English Phonics',
    dueDate: 'Yesterday',
    instructions: 'Trace uppercase B and lowercase b 5 times each. Draw a ball and a butterfly.',
    isCompleted: true,
  },
  {
    id: 't-3',
    title: 'Count 5 Leaves in the Garden',
    subject: 'Nature & Numbers',
    dueDate: '28 Oct 2026',
    instructions: 'Collect and paste 5 different fallen leaves in the scrapbook.',
    isCompleted: true,
  },
];

export default function ParentHomeworkPage() {
  const [tasks, setTasks] = useState<HomeworkTask[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)));
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Breadcrumbs
        items={[{ label: 'Parent Portal', href: paths.parent.dashboard }, { label: 'Home work' }]}
      />

      <div className="flex items-center gap-3">
        <Link
          href={paths.parent.dashboard}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-2xs transition hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Aditya&apos;s Home Work
          </h1>
          <p className="mt-0.5 text-xs text-gray-500">Nursery A · Preschool Learning Tasks</p>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`rounded-2xl border p-5 shadow-2xs transition ${
              task.isCompleted
                ? 'border-gray-200 bg-white/70 opacity-90'
                : 'border-orange-200 bg-[#FFFDF9]'
            }`}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="inline-block rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-700">
                  {task.subject}
                </span>
                <h3 className="mt-2 text-base font-extrabold text-gray-900">{task.title}</h3>
                <p className="mt-1 text-xs text-gray-600">{task.instructions}</p>
              </div>

              <div className="flex items-center gap-2 self-start rounded-full bg-white px-3 py-1 font-mono text-xs font-semibold text-gray-600 shadow-2xs sm:self-auto">
                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                <span>Due: {task.dueDate}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
              <span className="text-xs text-gray-500">
                Status:{' '}
                <strong className={task.isCompleted ? 'text-emerald-700' : 'text-amber-600'}>
                  {task.isCompleted ? 'Completed & Verified' : 'Pending Submission'}
                </strong>
              </span>

              <button
                type="button"
                onClick={() => toggleTask(task.id)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition active:scale-95 ${
                  task.isCompleted
                    ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {task.isCompleted ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : null}
                <span>{task.isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
