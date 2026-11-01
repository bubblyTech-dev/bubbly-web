'use client';

import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { ArrowLeft, Award, Download } from 'lucide-react';

interface MilestoneSkill {
  name: string;
  category: string;
  rating: 'Mastered' | 'Developing' | 'Needs Practice';
  remarks: string;
}

const milestoneSkills: MilestoneSkill[] = [
  {
    name: 'Pencil Grip & Crayon Control',
    category: 'Fine Motor Skills',
    rating: 'Mastered',
    remarks: 'Good tripod grip with crayons and safety scissors.',
  },
  {
    name: 'Phonics Letter Sounds (A to J)',
    category: 'Language & Literacy',
    rating: 'Mastered',
    remarks: 'Identifies sounds and names objects accurately.',
  },
  {
    name: 'Number Recognition (1 to 20)',
    category: 'Numeracy & Logic',
    rating: 'Mastered',
    remarks: 'Can count objects and match quantities.',
  },
  {
    name: 'Sharing & Cooperative Play',
    category: 'Social & Emotional',
    rating: 'Developing',
    remarks: 'Participates happily in circle time and snack sharing.',
  },
  {
    name: 'Clay Modeling & Sensory Dough',
    category: 'Creative Arts',
    rating: 'Mastered',
    remarks: 'Enthusiastic in sensory play and color mixing.',
  },
];

export default function ParentReportPage() {
  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Breadcrumbs
        items={[
          { label: 'Parent Portal', href: paths.parent.dashboard },
          { label: 'Progress Report' },
        ]}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={paths.parent.dashboard}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-2xs transition hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Developmental Progress Report
            </h1>
            <p className="mt-0.5 text-xs text-gray-500">
              Aditya Dave · Nursery A · Term 1 (2026 - 2027)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-1.5 self-start rounded-full bg-black px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-gray-800 active:scale-95 sm:self-auto"
        >
          <Download className="h-4 w-4" />
          <span>Download Report Card</span>
        </button>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-[#F4F5F7] p-5 shadow-2xs sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
              <Award className="h-6 w-6 text-amber-400" />
            </span>
            <div>
              <h2 className="text-base font-extrabold text-gray-900">Term 1 Assessment Overview</h2>
              <p className="text-xs text-gray-500">Evaluated by Class Teacher Priya Sharma</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-xs font-bold text-emerald-800">
            Grade: A+ (Outstanding)
          </span>
        </div>

        <div className="mt-4 rounded-xl bg-white p-4 text-xs leading-relaxed text-gray-700">
          <strong>Teacher Remarks:</strong> Aditya is an energetic, curious, and cheerful
          preschooler. He engages actively in morning circle time, enjoys story sessions, and shows
          exceptional creativity in art and clay modeling activities.
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-2xs">
        <div className="border-b border-gray-100 p-4 text-xs font-bold text-gray-700">
          Key Developmental Milestones (Early Years Foundation)
        </div>

        <div className="divide-y divide-gray-100">
          {milestoneSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col justify-between gap-2 p-4 sm:flex-row sm:items-center sm:px-6"
            >
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  {skill.category}
                </span>
                <h3 className="text-sm font-bold text-gray-900">{skill.name}</h3>
                <p className="mt-0.5 text-xs text-gray-500">{skill.remarks}</p>
              </div>

              <span
                className={`self-start rounded-full px-3 py-1 text-xs font-bold sm:self-center ${
                  skill.rating === 'Mastered'
                    ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border border-amber-200 bg-amber-50 text-amber-700'
                }`}
              >
                {skill.rating}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
