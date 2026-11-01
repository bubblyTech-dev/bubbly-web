'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { paths } from '@/config/paths';
import { Send, Search } from 'lucide-react';

interface ChatConversation {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
}

const conversations: ChatConversation[] = [
  {
    id: 'conv-1',
    name: 'Principal Brij',
    role: 'School Principal',
    lastMessage: 'Good morning! Please make sure the playground is supervised.',
    time: '9:30 AM',
  },
  {
    id: 'conv-2',
    name: 'Bhavna Patel (Vivaan)',
    role: 'Parent · Jr KG A',
    lastMessage: 'Vivaan enjoyed the clay diya craft yesterday!',
    time: 'Yesterday',
  },
  {
    id: 'conv-3',
    name: 'Kavita Joshi (Kabir)',
    role: 'Parent · Jr KG A',
    lastMessage: 'Will pickup at 12:45 PM today.',
    time: 'Yesterday',
  },
];

export default function TeacherChatPage() {
  const [activeChat, setActiveChat] = useState<ChatConversation>(conversations[0]!);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<
    Record<string, Array<{ id: number; text: string; sender: string; time: string; isMe: boolean }>>
  >({
    'conv-1': [
      {
        id: 1,
        text: 'Good morning Brij! Today we will do letter B tracing.',
        sender: 'Teacher',
        time: '9:15 AM',
        isMe: true,
      },
      {
        id: 2,
        text: 'Good morning! Please make sure the playground is supervised.',
        sender: 'Principal Brij',
        time: '9:30 AM',
        isMe: false,
      },
    ],
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const currentList = messages[activeChat.id] || [];
    setMessages({
      ...messages,
      [activeChat.id]: [
        ...currentList,
        { id: Date.now(), text: inputText, sender: 'Teacher', time: 'Just now', isMe: true },
      ],
    });
    setInputText('');
  };

  const currentMessages = messages[activeChat.id] || [
    {
      id: 1,
      text: `Hello Teacher, ${activeChat.lastMessage}`,
      sender: activeChat.name,
      time: activeChat.time,
      isMe: false,
    },
  ];

  return (
    <div className="animate-in fade-in space-y-4 duration-300">
      <Breadcrumbs
        items={[{ label: 'Teacher', href: paths.teacher.dashboard }, { label: 'Chat' }]}
      />

      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Teacher Messaging
        </h1>
        <p className="mt-0.5 text-xs text-gray-500">Direct chat with Principal and Class Parents</p>
      </div>

      <div className="grid min-h-[500px] grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xs md:grid-cols-12">
        <div className="border-r border-gray-200 bg-gray-50/50 p-3 md:col-span-5">
          <div className="relative mb-3">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search chat..."
              className="w-full rounded-full border border-gray-300 bg-white py-1.5 pr-3 pl-8 text-xs focus:border-black focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            {conversations.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveChat(c)}
                className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                  activeChat.id === c.id ? 'bg-white shadow-2xs' : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] text-xs font-bold text-gray-700">
                  {c.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="truncate text-xs font-bold text-gray-900">{c.name}</span>
                    <span className="text-[10px] text-gray-400">{c.time}</span>
                  </div>
                  <p className="truncate text-[11px] text-gray-500">{c.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-white md:col-span-7">
          <div className="flex items-center gap-3 border-b border-gray-100 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
              {activeChat.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">{activeChat.name}</div>
              <div className="text-[11px] text-gray-500">{activeChat.role}</div>
            </div>
          </div>

          <div className="flex-1 space-y-3 p-4">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    msg.isMe ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="mt-1 text-[10px] text-gray-400">{msg.time}</span>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-gray-100 p-3"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type message..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-xs focus:border-black focus:outline-hidden"
            />
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:bg-gray-800"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
