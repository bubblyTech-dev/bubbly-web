import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui';
import { paths } from '@/config/paths';
import { ArrowRight, Sparkles, School, Users, HeartHandshake } from 'lucide-react';

export default function HomePage() {
  return (
    <Container className="py-12 sm:py-16">
      <section className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-semibold text-gray-800 shadow-2xs">
          <Sparkles className="h-3.5 w-3.5 text-orange-500" />
          <span>SaaS School Management for Modern Preschools</span>
        </div>

        {/* Hero Heading */}
        <h1 className="mt-6 text-4xl leading-[1.1] font-black tracking-tight text-gray-900 sm:text-6xl">
          School management,{' '}
          <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">
            made simple
          </span>{' '}
          for preschools.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
          The complete preschool operating system featuring unified workspaces for{' '}
          <span className="font-bold text-gray-900">Principal Admins</span>,{' '}
          <span className="font-bold text-gray-900">Teachers</span>, and{' '}
          <span className="font-bold text-gray-900">Parents</span>.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            href={paths.workspace.dashboard}
            size="lg"
            className="flex items-center gap-2 rounded-full bg-black px-7 text-white shadow-md hover:bg-gray-800"
          >
            <span>Open Principal Admin Workspace</span>
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button href={paths.pricing} variant="outline" size="lg" className="rounded-full">
            View Pricing Plans
          </Button>
        </div>

        {/* 3 Core Apps Highlight per User Requirement */}
        <div className="mt-16 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
          {/* Card 1: Principal Admin */}
          <Link
            href={paths.workspace.dashboard}
            className="group rounded-2xl border-2 border-black bg-white p-6 shadow-md transition hover:-translate-y-1"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
              <School className="h-6 w-6" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-gray-900">1. Principal Admin</h3>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                Active View
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-gray-600">
              Admission enquiries, fee collection & receipts, leave approvals, class & student
              oversight.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-black group-hover:underline">
              <span>Explore Admin Screens</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Card 2: Teacher App */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-6 transition">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white">
              <Users className="h-6 w-6" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-gray-900">2. Teacher App</h3>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                Flow In SOW
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-gray-600">
              Classroom attendance, daily activities & homework, leave submissions, timetables.
            </p>
            <div className="mt-4 text-xs font-semibold text-gray-400">Designs coming next</div>
          </div>

          {/* Card 3: Parent App */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-6 transition">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500 text-white">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-gray-900">3. Parent App</h3>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                Phase 2 Flow
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-gray-600">
              Fee receipts, kid daily attendance updates, announcements, teacher communication.
            </p>
            <div className="mt-4 text-xs font-semibold text-gray-400">Designs coming next</div>
          </div>
        </div>
      </section>
    </Container>
  );
}
