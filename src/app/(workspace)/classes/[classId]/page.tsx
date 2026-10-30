'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Eye, Edit2, MessageSquare, Search, X, Calendar, ArrowLeft } from 'lucide-react';
import { paths } from '@/config/paths';

interface Student {
  id: string;
  name: string;
  parentName: string;
  dob: string;
  phone: string;
  address?: string;
  bloodGroup?: string;
}

const classStudentsData: Record<
  string,
  { name: string; teacherName: string; teacherId: string; students: Student[] }
> = {
  playgroup: {
    name: 'Playgroup',
    teacherName: 'Neha Verma',
    teacherId: 't-4',
    students: [
      {
        id: 's-1',
        name: 'Aditya Dave',
        parentName: 'Pallavi Dave',
        dob: '14/05/2022',
        phone: '+919685775896',
        bloodGroup: 'B+',
      },
      {
        id: 's-2',
        name: 'Kiara Mehta',
        parentName: 'Rohan Mehta',
        dob: '02/11/2021',
        phone: '+919876543210',
        bloodGroup: 'O+',
      },
      {
        id: 's-3',
        name: 'Aarav Singhania',
        parentName: 'Vikram Singhania',
        dob: '28/08/2022',
        phone: '+919822001122',
        bloodGroup: 'A+',
      },
      {
        id: 's-4',
        name: 'Ishaani Patel',
        parentName: 'Bhavna Patel',
        dob: '19/01/2022',
        phone: '+919428012345',
        bloodGroup: 'AB+',
      },
      {
        id: 's-5',
        name: 'Dhruv Trivedi',
        parentName: 'Manoj Trivedi',
        dob: '05/04/2022',
        phone: '+919712398765',
        bloodGroup: 'B+',
      },
    ],
  },
  nursery: {
    name: 'Nursery',
    teacherName: 'Priya Sharma',
    teacherId: 't-3',
    students: [
      {
        id: 's-6',
        name: 'Reyansh Shah',
        parentName: 'Sneha Shah',
        dob: '12/03/2021',
        phone: '+919898011223',
        bloodGroup: 'O+',
      },
      {
        id: 's-7',
        name: 'Ananya Gupta Jr',
        parentName: 'Ritu Gupta',
        dob: '22/07/2021',
        phone: '+919123456789',
        bloodGroup: 'A+',
      },
      {
        id: 's-8',
        name: 'Vihaan Verma',
        parentName: 'Sunil Verma',
        dob: '15/09/2021',
        phone: '+919876500000',
        bloodGroup: 'B+',
      },
    ],
  },
  'jr-kg': {
    name: 'Jr KG',
    teacherName: 'Ananya Gupta',
    teacherId: 't-2',
    students: [
      {
        id: 's-9',
        name: 'Vivaan Patel',
        parentName: 'Bhavna Patel',
        dob: '18/10/2020',
        phone: '+919428012345',
        bloodGroup: 'O+',
      },
      {
        id: 's-10',
        name: 'Kabir Joshi',
        parentName: 'Kavita Joshi',
        dob: '04/01/2021',
        phone: '+919712398765',
        bloodGroup: 'B+',
      },
    ],
  },
  'sr-kg': {
    name: 'Sr KG',
    teacherName: 'Pallavi Dave',
    teacherId: 't-1',
    students: [
      {
        id: 's-11',
        name: 'Dia Trivedi',
        parentName: 'Megha Trivedi',
        dob: '11/02/2020',
        phone: '+919685712345',
        bloodGroup: 'A+',
      },
      {
        id: 's-12',
        name: 'Devansh Sharma',
        parentName: 'Rohit Sharma',
        dob: '29/06/2020',
        phone: '+919825099887',
        bloodGroup: 'O+',
      },
    ],
  },
};

export default function ClassDetailsPage({ params }: { params: Promise<{ classId: string }> }) {
  const resolvedParams = use(params);
  const classKey = resolvedParams.classId.toLowerCase();
  const classInfo = classStudentsData[classKey] || classStudentsData['playgroup']!;

  const [students, setStudents] = useState<Student[]>(classInfo.students);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [messageToast, setMessageToast] = useState<string | null>(null);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.includes(searchQuery),
  );

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    setStudents((prev) => prev.map((s) => (s.id === editingStudent.id ? editingStudent : s)));
    setEditingStudent(null);
  };

  const handleSendMessage = (student: Student) => {
    setMessageToast(`Chat initiated with ${student.parentName} (Parent of ${student.name})`);
    setTimeout(() => setMessageToast(null), 3000);
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      {/* Breadcrumbs matching Figma Image 1 & 3 */}
      <Breadcrumbs
        items={[{ label: 'Class', href: paths.workspace.classes }, { label: classInfo.name }]}
      />

      {/* Header Row: Title & Teacher Name Pill (Matching Figma Image 3) */}
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
              {classInfo.name} ({students.length})
            </h1>
            <p className="mt-0.5 text-xs text-gray-500">
              Class roster, parent contacts, and student records.
            </p>
          </div>
        </div>

        {/* Teacher Name Pill Button with Eye Icon (Matching Figma Image 3) */}
        <Link
          href={`/teachers/${classInfo.teacherId}`}
          className="group flex items-center justify-between gap-2.5 self-start rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-800 shadow-2xs transition hover:border-black hover:bg-gray-50 sm:self-auto sm:text-sm"
        >
          <span>Teacher: {classInfo.teacherName}</span>
          <Eye className="h-4 w-4 text-gray-500 transition group-hover:text-black" />
        </Link>
      </div>

      {/* Search Bar */}
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

      {/* Student List View (Matching Figma Image 3) */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xs">
        {filteredStudents.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm font-medium text-gray-500">No students found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="group flex flex-col justify-between gap-3 p-4 transition-colors hover:bg-gray-50/70 sm:flex-row sm:items-center sm:px-6"
              >
                {/* Left: Avatar & Student + Parent Info */}
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] text-xs font-bold text-gray-600 shadow-inner">
                    {student.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 group-hover:text-black">
                      {student.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Parent:{' '}
                      <span className="font-medium text-gray-700">{student.parentName}</span>
                    </div>
                  </div>
                </div>

                {/* Middle: Date of Birth */}
                <div className="flex items-center gap-6 pl-14 text-xs text-gray-600 sm:pl-0">
                  <div className="flex items-center gap-1.5 font-mono">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    <span>DOB: {student.dob}</span>
                  </div>
                  {student.bloodGroup && (
                    <span className="hidden rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-700 md:inline-block">
                      {student.bloodGroup}
                    </span>
                  )}
                </div>

                {/* Right: Actions - Edit, Message, Eye (Matching Figma Image 3) */}
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
                    onClick={() => handleSendMessage(student)}
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

      {/* Message Toast */}
      {messageToast && (
        <div className="animate-in fade-in slide-in-from-bottom-2 fixed right-6 bottom-20 z-50 flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs text-white shadow-xl">
          <MessageSquare className="h-4 w-4 text-emerald-400" />
          <span>{messageToast}</span>
        </div>
      )}

      {/* Student View Details Modal */}
      {activeStudent && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                  {activeStudent.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{activeStudent.name}</h3>
                  <p className="text-xs text-gray-500">{classInfo.name} Student</p>
                </div>
              </div>
              <button
                onClick={() => setActiveStudent(null)}
                className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5 text-xs text-gray-600">
              <div className="flex justify-between border-b border-gray-100 py-1">
                <span className="text-gray-400">Parent / Guardian:</span>
                <span className="font-semibold text-gray-900">{activeStudent.parentName}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 py-1">
                <span className="text-gray-400">Contact Number:</span>
                <span className="font-mono font-semibold text-gray-900">{activeStudent.phone}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 py-1">
                <span className="text-gray-400">Date of Birth:</span>
                <span className="font-mono text-gray-900">{activeStudent.dob}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 py-1">
                <span className="text-gray-400">Blood Group:</span>
                <span className="font-bold text-gray-900">{activeStudent.bloodGroup || 'O+'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-400">Class Teacher:</span>
                <span className="font-semibold text-gray-900">{classInfo.teacherName}</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveStudent(null)}
                className="rounded-full bg-black px-5 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Edit2 className="h-4 w-4 text-gray-700" />
                <h3 className="text-sm font-bold text-gray-900">Edit Student Information</h3>
              </div>
              <button
                onClick={() => setEditingStudent(null)}
                className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="mb-1 block font-semibold text-gray-700">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">
                  Parent / Guardian Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingStudent.parentName}
                  onChange={(e) =>
                    setEditingStudent({ ...editingStudent, parentName: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block font-semibold text-gray-700">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={editingStudent.phone}
                    onChange={(e) =>
                      setEditingStudent({ ...editingStudent, phone: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-black focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-semibold text-gray-700">Date of Birth *</label>
                  <input
                    type="text"
                    required
                    value={editingStudent.dob}
                    onChange={(e) => setEditingStudent({ ...editingStudent, dob: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-black focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="rounded-full border border-gray-300 px-4 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-black px-5 py-1.5 text-xs font-semibold text-white hover:bg-gray-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
