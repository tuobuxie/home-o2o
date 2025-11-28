import React from 'react';
import { Home, User, CalendarDays, MessageSquare } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Home size={24} />, label: '首页', path: '/' },
    { icon: <CalendarDays size={24} />, label: '订单', path: '/orders' }, // 这里的路径是演示用，实际可能未实现
    { icon: <MessageSquare size={24} />, label: '客服', path: '/chat' },
    { icon: <User size={24} />, label: '我的', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-6 pb-2 z-40">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 ${
                isActive ? 'text-teal-600' : 'text-gray-400'
              }`}
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
