'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Edit2, X, School } from 'lucide-react';

interface ClassItem {
  id: string;
  name: string;
  code: string;
  studentCount: number;
  teacherName: string;
  roomNumber?: string;
  timing?: string;
}

const initialClasses: ClassItem[] = [
  {
    id: 'cls-1',
    name: 'Playgroup',
    code: 'PG-A',
    studentCount: 120,
    teacherName: 'Neha Verma',
    roomNumber: 'Room 101',
    timing: '9:00 AM - 12:00 PM',
  },
  {
    id: 'cls-2',
    name: 'Nursery',
    code: 'NUR-A',
    studentCount: 140,
    teacherName: 'Priya Sharma',
    roomNumber: 'Room 102',
    timing: '8:45 AM - 12:30 PM',
  },
  {
    id: 'cls-3',
    name: 'Jr KG',
    code: 'JKG-A',
    studentCount: 130,
    teacherName: 'Ananya Gupta',
    roomNumber: 'Room 103',
    timing: '8:30 AM - 1:00 PM',
  },
  {
    id: 'cls-4',
    name: 'Sr KG',
    code: 'SKG-A',
    studentCount: 134,
    teacherName: 'Pallavi Dave',
    roomNumber: 'Room 104',
    timing: '8:30 AM - 1:30 PM',
  },
];

export default function ClassesPage() {
  const [classList, setClassList] = useState<ClassItem[]>(initialClasses);
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('Activity Batch');
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newStudentCount, setNewStudentCount] = useState(25);

  const totalStudents = classList.reduce((acc, c) => acc + c.studentCount, 0);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClass) return;
    setClassList((prev) => prev.map((c) => (c.id === editingClass.id ? editingClass : c)));
    setEditingClass(null);
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    const newClass: ClassItem = {
      id: `cls-${Date.now()}`,
      name: newClassName,
      code: `${newClassName.substring(0, 3).toUpperCase()}-B`,
      studentCount: Number(newStudentCount) || 20,
      teacherName: newTeacherName || 'To Be Assigned',
      roomNumber: `Room 10${classList.length + 1}`,
      timing: '9:00 AM - 12:30 PM',
    };
    setClassList([...classList, newClass]);
    setIsAddModalOpen(false);
    setNewTeacherName('');
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Classes' }]} />

      {/* Title & Total Students Row (Matching Figma Screen 5) */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Class({classList.length})
        </h1>
        <div className="text-sm font-bold text-gray-900 sm:text-base">
          Total students :{totalStudents}
        </div>
      </div>

      {/* Grid of Class Cards (Matching Figma Screen 5) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {classList.map((cls) => (
          <div
            key={cls.id}
            className="flex min-h-[170px] flex-col justify-between rounded-2xl bg-[#F4F5F7] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div>
              <h2 className="text-xs font-semibold text-gray-700 capitalize">{cls.name}</h2>
              <div className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                {cls.studentCount}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-200/60 pt-3 text-xs">
              <span className="max-w-[130px] truncate text-gray-500">{cls.teacherName}</span>
              <button
                type="button"
                onClick={() => setEditingClass(cls)}
                className="flex cursor-pointer items-center gap-1 font-bold text-gray-900 hover:text-black hover:underline"
              >
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}

        {/* "+ Add class" Card (Matching Figma Screen 5) */}
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
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

      {/* Edit Class Modal */}
      {editingClass && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Edit2 className="h-4 w-4 text-gray-700" />
                <h3 className="text-base font-bold text-gray-900">
                  Edit Class: {editingClass.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingClass(null)}
                className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="mb-1 block font-semibold text-gray-700">Class Name</label>
                <input
                  type="text"
                  value={editingClass.name}
                  onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">Class Teacher Name</label>
                <input
                  type="text"
                  value={editingClass.teacherName}
                  onChange={(e) =>
                    setEditingClass({ ...editingClass, teacherName: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">
                  Enrolled Students Count
                </label>
                <input
                  type="number"
                  value={editingClass.studentCount}
                  onChange={(e) =>
                    setEditingClass({
                      ...editingClass,
                      studentCount: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingClass(null)}
                  className="rounded-full border border-gray-300 px-4 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-black px-5 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Class Modal */}
      {isAddModalOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <School className="h-5 w-5 text-gray-700" />
                <h3 className="text-base font-bold text-gray-900">Add New Class</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddClass} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="mb-1 block font-semibold text-gray-700">
                  Class / Group Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Daycare Toddlers / Activity Wing"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">Class Teacher *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Ms. Kavita Joshi"
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">
                  Initial Capacity / Students
                </label>
                <input
                  type="number"
                  value={newStudentCount}
                  onChange={(e) => setNewStudentCount(Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-full border border-gray-300 px-4 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-black px-5 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-800"
                >
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
