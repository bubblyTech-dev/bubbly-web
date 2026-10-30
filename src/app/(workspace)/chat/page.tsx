'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Send, Search, ArrowLeft } from 'lucide-react';

interface ChatItem {
  id: string;
  name: string;
  role: string;
  classType: 'Playgroup' | 'Nursery' | 'Jr kg' | 'Sr kg';
  targetType: 'Teachers' | 'Parents';
  lastMessage: string;
  time: string;
  unreadCount?: number;
  phone?: string;
}

const initialChatList: ChatItem[] = [
  {
    id: 'c-1',
    name: 'Pallavi Dave',
    role: 'Teacher · Sr KG A',
    classType: 'Sr kg',
    targetType: 'Teachers',
    lastMessage: 'Lesson plans for Diwali activity week submitted.',
    time: '10:30 AM',
    unreadCount: 2,
    phone: '+919685775896',
  },
  {
    id: 'c-2',
    name: 'Ananya Gupta',
    role: 'Teacher · Jr KG',
    classType: 'Jr kg',
    targetType: 'Teachers',
    lastMessage: 'Tomorrow Jr KG will have circle time in the library.',
    time: '9:45 AM',
    unreadCount: 0,
    phone: '+919123456789',
  },
  {
    id: 'c-3',
    name: 'Priya Sharma',
    role: 'Teacher · Nursery',
    classType: 'Nursery',
    targetType: 'Teachers',
    lastMessage: 'Snack menu received, parents notified.',
    time: 'Yesterday',
    unreadCount: 0,
    phone: '+919876543210',
  },
  {
    id: 'c-4',
    name: 'Neha Verma',
    role: 'Teacher · Playgroup',
    classType: 'Playgroup',
    targetType: 'Teachers',
    lastMessage: 'Sensory clay activity went wonderfully today!',
    time: 'Yesterday',
    unreadCount: 0,
    phone: '+919428012345',
  },
  {
    id: 'c-5',
    name: "Pallavi Dave (Aditya's Parent)",
    role: 'Parent · Nursery',
    classType: 'Nursery',
    targetType: 'Parents',
    lastMessage: 'Thank you for updating the second semester fee slip.',
    time: 'Yesterday',
    unreadCount: 1,
    phone: '+919685775896',
  },
  {
    id: 'c-6',
    name: "Rohan Mehta (Kiara's Parent)",
    role: 'Parent · Playgroup',
    classType: 'Playgroup',
    targetType: 'Parents',
    lastMessage: 'Will pickup at 12:15 PM today due to doctor visit.',
    time: '2 days ago',
    unreadCount: 0,
    phone: '+919876543210',
  },
  {
    id: 'c-7',
    name: "Bhavna Patel (Vivaan's Parent)",
    role: 'Parent · Jr KG',
    classType: 'Jr kg',
    targetType: 'Parents',
    lastMessage: 'Shared medical certificate on portal.',
    time: '28 Oct',
    unreadCount: 0,
    phone: '+919428012345',
  },
];

export default function ChatPage() {
  const [targetType, setTargetType] = useState<'Teachers' | 'Parents'>('Teachers');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChat, setActiveChat] = useState<ChatItem>(initialChatList[0]!);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const [messages, setMessages] = useState<
    Record<string, Array<{ id: number; sender: string; text: string; time: string; isMe: boolean }>>
  >({
    'c-1': [
      {
        id: 1,
        sender: 'Pallavi Dave',
        text: 'Good morning Brij! Snack menu verified for today.',
        time: '9:15 AM',
        isMe: false,
      },
      {
        id: 2,
        sender: 'Principal Brij',
        text: 'Good morning Pallavi. Please ensure playground safety during recess.',
        time: '9:30 AM',
        isMe: true,
      },
      {
        id: 3,
        sender: 'Pallavi Dave',
        text: 'Lesson plans for Diwali activity week submitted.',
        time: '10:30 AM',
        isMe: false,
      },
    ],
    'c-5': [
      {
        id: 1,
        sender: 'Pallavi Dave',
        text: 'Hello Principal sir, is afternoon bus pickup confirmed for sector 4?',
        time: '11:00 AM',
        isMe: false,
      },
      {
        id: 2,
        sender: 'Principal Brij',
        text: 'Yes, Bus Route #2 covers sector 4 at 12:45 PM.',
        time: '11:20 AM',
        isMe: true,
      },
      {
        id: 3,
        sender: 'Pallavi Dave',
        text: 'Thank you for updating the second semester fee slip.',
        time: 'Yesterday',
        isMe: false,
      },
    ],
  });

  const [inputText, setInputText] = useState('');

  const classTabs = ['All', 'Playgroup', 'Nursery', 'Jr kg', 'Sr kg'];

  const filteredChats = initialChatList.filter((c) => {
    const matchesTarget = c.targetType === targetType;
    const matchesClass = selectedClass === 'All' || c.classType === selectedClass;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTarget && matchesClass && matchesSearch;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const currentMsgList = messages[activeChat.id] || [];
    setMessages({
      ...messages,
      [activeChat.id]: [
        ...currentMsgList,
        {
          id: Date.now(),
          sender: 'Principal Brij',
          text: inputText,
          time: 'Just now',
          isMe: true,
        },
      ],
    });
    setInputText('');
  };

  const currentMessages = messages[activeChat.id] || [
    {
      id: 1,
      sender: activeChat.name,
      text: `Hello Brij, ${activeChat.lastMessage}`,
      time: activeChat.time,
      isMe: false,
    },
  ];

  return (
    <div className="animate-in fade-in space-y-4 duration-300">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Chat' }]} />

      {/* Header Matching Figma Image 5 Screen 2 */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Chat</h1>
        <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
          Direct communication channels with preschool teachers and enrolled parents.
        </p>
      </div>

      {/* Main Container */}
      <div className="grid min-h-[580px] grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xs md:grid-cols-12">
        {/* Left Column: Search, Target Pills (Teachers/Parents), Class Tabs, and Chat List */}
        <div
          className={`flex flex-col border-r border-gray-200 bg-gray-50/50 md:col-span-5 ${
            isMobileChatOpen ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Search Input */}
          <div className="border-b border-gray-200 bg-white p-3.5">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-full border border-gray-300 bg-white py-2 pr-3 pl-9 text-xs focus:border-black focus:outline-hidden"
              />
            </div>

            {/* Target Filter Pills: Teachers / Parents (Matching Figma Image 5 Screen 2) */}
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTargetType('Teachers')}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  targetType === 'Teachers'
                    ? 'bg-black text-white shadow-2xs'
                    : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Teachers
              </button>
              <button
                type="button"
                onClick={() => setTargetType('Parents')}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  targetType === 'Parents'
                    ? 'bg-black text-white shadow-2xs'
                    : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Parents
              </button>
            </div>

            {/* Class Tabs: Playgroup, Nursery, Jr kg, Sr kg (Matching Figma Image 5 Screen 2) */}
            <div className="mt-3 flex items-center gap-4 overflow-x-auto border-t border-gray-100 pt-1 text-xs font-semibold text-gray-500">
              {classTabs.map((tab) => {
                const isActive = selectedClass === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSelectedClass(tab)}
                    className={`py-1 capitalize transition ${
                      isActive ? 'border-b-2 border-black font-bold text-black' : 'hover:text-black'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 divide-y divide-gray-100 overflow-y-auto">
            {filteredChats.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-400">
                No conversations found in {targetType} ({selectedClass}).
              </div>
            ) : (
              filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => {
                    setActiveChat(chat);
                    setIsMobileChatOpen(true);
                  }}
                  className={`flex w-full items-start gap-3 p-3.5 text-left transition ${
                    activeChat.id === chat.id ? 'bg-white shadow-2xs' : 'hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] text-xs font-bold text-gray-700 shadow-inner">
                    {chat.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .substring(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-xs font-bold text-gray-900">{chat.name}</span>
                      <span className="text-[10px] text-gray-400">{chat.time}</span>
                    </div>
                    <div className="truncate text-[11px] text-gray-500">{chat.role}</div>
                    <p className="mt-0.5 truncate text-xs text-gray-600">{chat.lastMessage}</p>
                  </div>
                  {chat.unreadCount ? (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] font-bold text-white">
                      {chat.unreadCount}
                    </span>
                  ) : null}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Chat Thread (Responsive for Mobile) */}
        <div
          className={`flex flex-col bg-white md:col-span-7 ${
            !isMobileChatOpen ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Thread Header */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-white p-3.5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileChatOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 md:hidden"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                {activeChat.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)}
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900">{activeChat.name}</h3>
                <span className="text-[10px] font-medium text-gray-500">
                  {activeChat.role} · {activeChat.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-[#FBFBFC] p-4">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
              >
                <span className="mb-0.5 px-1 text-[10px] text-gray-400">{msg.sender}</span>
                <div
                  className={`max-w-xs rounded-2xl px-4 py-2 text-xs leading-relaxed sm:max-w-md ${
                    msg.isMe
                      ? 'rounded-br-xs bg-black text-white'
                      : 'rounded-bl-xs border border-gray-200/80 bg-white text-gray-800 shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="mt-0.5 px-1 text-[9px] text-gray-400">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 border-t border-gray-200 bg-white p-3"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeChat.name}...`}
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-xs focus:border-black focus:outline-hidden"
            />
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-xs transition hover:bg-gray-800 active:scale-95"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
