'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { initialTeachersList, type Teacher } from '../page';
import {
  Phone,
  Mail,
  GraduationCap,
  Clock,
  MapPin,
  Shield,
  MessageSquare,
  ArrowLeft,
  Check,
  Edit2,
} from 'lucide-react';
import { paths } from '@/config/paths';

export default function TeacherProfilePage({ params }: { params: Promise<{ teacherId: string }> }) {
  const resolvedParams = use(params);
  const teacherId = resolvedParams.teacherId;
  const initialTeacher =
    initialTeachersList.find((t) => t.id === teacherId) || initialTeachersList[0]!;

  const [teacher, setTeacher] = useState<Teacher>(initialTeacher);
  const [isEditMode, setIsEditMode] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditMode(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      {/* Breadcrumbs (Matching Figma Image 5 Screen 1) */}
      <Breadcrumbs
        items={[{ label: 'Teacher', href: paths.workspace.teachers }, { label: 'Main profile' }]}
      />

      {/* Top Header Row with Back button & Actions */}
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
              {teacher.role} · {teacher.classAssigned}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            href={paths.workspace.chat}
            className="flex items-center gap-1.5 rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-gray-800"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Message</span>
          </Link>

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

      {savedToast && (
        <div className="animate-in fade-in flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
          <Check className="h-4 w-4 text-emerald-600" />
          <span>Teacher profile details updated successfully!</span>
        </div>
      )}

      {/* Main Profile Grid (Matching Figma Image 5 Screen 1) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Avatar & Summary Card */}
        <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-[#FBFBFC] p-6 text-center shadow-2xs">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-black text-3xl font-extrabold text-white shadow-md">
            {teacher.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>

          <h2 className="text-lg font-bold text-gray-900">{teacher.name}</h2>
          <span className="mt-0.5 text-xs text-gray-500">{teacher.role}</span>
          <span className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-800">
            {teacher.classAssigned}
          </span>

          <div className="mt-6 w-full space-y-3 border-t border-gray-200/80 pt-4 text-left text-xs text-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Status:</span>
              <span
                className={`font-semibold ${
                  teacher.attendanceStatus === 'Present' ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {teacher.attendanceStatus} Today
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Joining Date:</span>
              <span className="font-mono">{teacher.joiningDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Experience:</span>
              <span className="font-semibold">{teacher.experience}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Contact & Professional Info (Matching Figma Image 5) */}
        <div className="lg:col-span-2">
          {isEditMode ? (
            <form
              onSubmit={handleSave}
              className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 text-xs shadow-2xs"
            >
              <h3 className="border-b border-gray-100 pb-2 text-sm font-bold text-gray-900">
                Edit Teacher Details
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={teacher.name}
                    onChange={(e) => setTeacher({ ...teacher, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-black focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-semibold text-gray-700">Class Assigned</label>
                  <input
                    type="text"
                    value={teacher.classAssigned}
                    onChange={(e) => setTeacher({ ...teacher, classAssigned: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-black focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    value={teacher.phone}
                    onChange={(e) => setTeacher({ ...teacher, phone: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 p-2 font-mono text-xs focus:border-black focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-semibold text-gray-700">Email Address</label>
                  <input
                    type="email"
                    value={teacher.email}
                    onChange={(e) => setTeacher({ ...teacher, email: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-black focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">Qualification</label>
                <input
                  type="text"
                  value={teacher.qualification}
                  onChange={(e) => setTeacher({ ...teacher, qualification: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-black focus:outline-hidden"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700">Emergency Contact</label>
                <input
                  type="tel"
                  value={teacher.emergencyContact}
                  onChange={(e) => setTeacher({ ...teacher, emergencyContact: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 p-2 font-mono text-xs focus:border-black focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditMode(false)}
                  className="rounded-full border border-gray-300 px-4 py-1.5 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-black px-5 py-1.5 font-semibold text-white hover:bg-gray-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-2xs">
              {/* Contact Information */}
              <div>
                <h3 className="mb-3 border-b border-gray-100 pb-2 text-sm font-bold text-gray-900">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">Phone:</span>
                    <a
                      href={`tel:${teacher.phone}`}
                      className="font-mono font-semibold hover:underline"
                    >
                      {teacher.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">Email:</span>
                    <a href={`mailto:${teacher.email}`} className="font-semibold hover:underline">
                      {teacher.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">Emergency:</span>
                    <span className="font-mono font-semibold">{teacher.emergencyContact}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">Campus:</span>
                    <span className="font-semibold">Main Wing Room 104</span>
                  </div>
                </div>
              </div>

              {/* Academic & Professional Information */}
              <div>
                <h3 className="mb-3 border-b border-gray-100 pb-2 text-sm font-bold text-gray-900">
                  Academic & Professional Credentials
                </h3>
                <div className="space-y-3 text-xs text-gray-700">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <span className="block text-gray-400">Qualification:</span>
                      <span className="font-semibold text-gray-900">{teacher.qualification}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <span className="block text-gray-400">Work Shift:</span>
                      <span className="font-semibold text-gray-900">
                        8:30 AM – 1:30 PM (Monday to Friday)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance & Leave Quick Status */}
              <div>
                <h3 className="mb-3 border-b border-gray-100 pb-2 text-sm font-bold text-gray-900">
                  Attendance & Leave Record
                </h3>
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="rounded-xl bg-[#F4F5F7] p-3">
                    <span className="block text-[10px] font-semibold text-gray-400 uppercase">
                      Present
                    </span>
                    <span className="text-lg font-black text-emerald-700">96.8%</span>
                  </div>

                  <div className="rounded-xl bg-[#F4F5F7] p-3">
                    <span className="block text-[10px] font-semibold text-gray-400 uppercase">
                      Leave Used
                    </span>
                    <span className="text-lg font-black text-rose-600">2 days</span>
                  </div>

                  <div className="rounded-xl bg-[#F4F5F7] p-3">
                    <span className="block text-[10px] font-semibold text-gray-400 uppercase">
                      Leaves Left
                    </span>
                    <span className="text-lg font-black text-gray-900">10 days</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
