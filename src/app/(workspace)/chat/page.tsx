'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Send, Search } from 'lucide-react';

interface ChatConversation {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  type: 'staff' | 'class' | 'parent';
}

const conversations: ChatConversation[] = [
  {
    id: 'c-1',
    name: 'Teachers Staff Room',
    role: 'All Teachers Channel',
    lastMessage: 'Pallavi: Lesson plans for Diwali activity week submitted.',
    time: '10:30 AM',
    unreadCount: 3,
    type: 'staff',
  },
  {
    id: 'c-2',
    name: 'Playgroup Parents Broadcast',
    role: '120 Guardians',
    lastMessage: 'Reminder: Tomorrow is sensory play day with colorful clay!',
    time: 'Yesterday',
    unreadCount: 0,
    type: 'class',
  },
  {
    id: 'c-3',
    name: 'Pallavi Dave',
    role: 'Teacher · Sr KG A',
    lastMessage: 'Thank you Brij for approving my casual leave.',
    time: 'Yesterday',
    unreadCount: 0,
    type: 'staff',
  },
  {
    id: 'c-4',
    name: 'Aditya Dave (Parent)',
    role: 'Nursery Enquiry',
    lastMessage: 'Is the afternoon bus route available for our sector?',
    time: '20 Oct',
    unreadCount: 1,
    type: 'parent',
  },
];

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<ChatConversation>(conversations[0]!);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Pallavi Dave',
      text: 'Good morning everyone! Please check the snack menu for today.',
      time: '9:15 AM',
      isMe: false,
    },
    {
      id: 2,
      sender: 'Principal Brij',
      text: 'Good morning team. Please ensure playground supervision is active during recess.',
      time: '9:30 AM',
      isMe: true,
    },
    {
      id: 3,
      sender: 'Ananya Gupta',
      text: 'Understood. Jr KG will take the green lawn area.',
      time: '9:45 AM',
      isMe: false,
    },
    {
      id: 4,
      sender: 'Pallavi Dave',
      text: 'Lesson plans for Diwali activity week submitted.',
      time: '10:30 AM',
      isMe: false,
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: 'Principal Brij',
        text: inputValue,
        time: 'Just now',
        isMe: true,
      },
    ]);
    setInputValue('');
  };

  return (
    <div className="animate-in fade-in space-y-4 duration-300">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Chat & Communication' }]} />

      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          School Messages
        </h1>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Direct messaging between Principal, Teachers, and Class broadcast channels.
        </p>
      </div>

      {/* Chat App Container */}
      <div className="grid h-[560px] grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xs md:grid-cols-3">
        {/* Left: Chat List */}
        <div className="flex flex-col border-r border-gray-200 bg-gray-50/50">
          <div className="border-b border-gray-200 p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full rounded-full border border-gray-300 bg-white py-1.5 pr-3 pl-8 text-xs focus:border-black focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex-1 divide-y divide-gray-100 overflow-y-auto">
            {conversations.map((chat) => (
              <button
                key={chat.id}
                type="button"
                onClick={() => setSelectedChat(chat)}
                className={`flex w-full items-start gap-3 p-3.5 text-left transition ${
                  selectedChat.id === chat.id ? 'bg-white shadow-2xs' : 'hover:bg-gray-100/70'
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
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
            ))}
          </div>
        </div>

        {/* Right: Active Chat Area */}
        <div className="flex flex-col bg-white md:col-span-2">
          {/* Active Chat Header */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-white p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                {selectedChat.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)}
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900">{selectedChat.name}</h3>
                <span className="text-[10px] font-medium text-emerald-600">
                  Active now · {selectedChat.role}
                </span>
              </div>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-[#FBFBFC] p-4">
            {messages.map((msg) => (
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

          {/* Send Input */}
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 border-t border-gray-200 bg-white p-3"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type message as Principal Brij..."
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
