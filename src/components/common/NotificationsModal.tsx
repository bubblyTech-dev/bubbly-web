'use client';

import Link from 'next/link';
import { X, Bell, UserCheck, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { paths } from '@/config/paths';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'New Leave Request',
      description: 'Pallavi Dave (Teacher · Sr KG A) requested 2 days Casual leave (12-13 Oct)',
      time: '15m ago',
      icon: Calendar,
      link: paths.workspace.leave,
      unread: true,
      tag: 'Leave',
    },
    {
      id: 2,
      title: 'New Admission Enquiry',
      description: 'Pallavi Dave submitted an enquiry for Aditya in Nursery',
      time: '1h ago',
      icon: UserCheck,
      link: paths.workspace.inquiries,
      unread: true,
      tag: 'Admission',
    },
    {
      id: 3,
      title: 'Fee Payment Pending',
      description: '5 students have second semester fees overdue',
      time: '3h ago',
      icon: DollarSign,
      link: paths.workspace.fees,
      unread: false,
      tag: 'Fees',
    },
  ];

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-start justify-end bg-black/20 p-4 backdrop-blur-xs sm:p-6">
      <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <Bell className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
            <span className="rounded-full bg-black px-2 py-0.5 text-[10px] font-bold text-white">
              2 new
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Notifications list */}
        <div className="mt-3 max-h-96 divide-y divide-gray-100 overflow-y-auto">
          {notifications.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.id}
                href={item.link}
                onClick={onClose}
                className={`group flex items-start gap-3 rounded-xl p-3 transition ${
                  item.unread ? 'bg-orange-50/50 hover:bg-orange-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white shadow-xs">
                  <IconComponent className="h-4 w-4 text-gray-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">{item.title}</span>
                    <span className="text-[10px] text-gray-400">{item.time}</span>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs text-gray-600">{item.description}</p>
                  <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-black group-hover:underline">
                    View details <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-gray-100 pt-3 text-center">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-gray-500 transition hover:text-black"
          >
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
}
