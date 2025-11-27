import React, { useState, useRef, useEffect } from 'react';
import { BottomNav } from '../components/BottomNav';
import { Send, User, Headphones } from 'lucide-react';

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: '您好！我是您的专属家政管家。请问有什么可以帮您？', isUser: false, time: '10:00' }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // 添加用户消息
    const userMsg = { 
      id: Date.now(), 
      text: inputText, 
      isUser: true, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // 模拟自动回复
    setTimeout(() => {
        const replyMsg = {
            id: Date.now() + 1,
            text: '收到您的消息，人工客服正如火如荼地赶来，请稍候...',
            isUser: false,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, replyMsg]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 pb-safe">
      {/* 顶部 */}
      <div className="bg-white p-4 shadow-sm flex items-center sticky top-0 z-10">
        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mr-3">
            <Headphones size={20} />
        </div>
        <div>
            <h1 className="font-bold text-gray-900">在线客服</h1>
            <p className="text-xs text-green-500 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                通常 1 分钟内回复
            </p>
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                {!msg.isUser && (
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex-shrink-0 mr-2 flex items-center justify-center text-white">
                        <Headphones size={14} />
                    </div>
                )}
                <div className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm text-sm ${
                    msg.isUser 
                        ? 'bg-teal-500 text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                }`}>
                    {msg.text}
                    <div className={`text-[10px] mt-1 text-right ${msg.isUser ? 'text-teal-100' : 'text-gray-400'}`}>
                        {msg.time}
                    </div>
                </div>
                {msg.isUser && (
                     <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 ml-2 flex items-center justify-center text-gray-500">
                        <User size={14} />
                    </div>
                )}
            </div>
        ))}
        <div ref={messagesEndRef} className="h-16" /> {/* 垫高底部，防止被导航栏遮挡 */}
      </div>

      {/* 输入框区域 */}
      <div className="bg-white p-3 border-t border-gray-200 fixed bottom-14 left-0 right-0 z-20">
        <form onSubmit={handleSend} className="flex items-center space-x-2">
            <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="请输入问题..."
                className="flex-1 bg-gray-100 text-gray-900 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <button 
                type="submit" 
                disabled={!inputText.trim()}
                className="p-2 bg-teal-500 text-white rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
                <Send size={18} />
            </button>
        </form>
      </div>

      <BottomNav />
    </div>
  );
};