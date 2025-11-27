import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import { User, Settings, CreditCard, MapPin, Gift, ChevronRight, LogOut, Phone } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-24">
             <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <User size={40} />
             </div>
             <p className="text-gray-500 mb-8">登录以管理您的预约和服务</p>
             <Button onClick={() => navigate('/login')} className="w-40 shadow-lg shadow-teal-100">立即登录</Button>
             <BottomNav />
        </div>
    );
  }

  const menuItems = [
    { icon: <MapPin size={20} />, label: '我的地址', value: '2个' },
    { icon: <Gift size={20} />, label: '优惠券', value: '3张' },
    { icon: <CreditCard size={20} />, label: '我的钱包', value: '¥0.00' },
    { icon: <Phone size={20} />, label: '联系客服', value: '' },
    { icon: <Settings size={20} />, label: '设置', value: '' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 头部卡片 */}
      <div className="bg-teal-500 pt-12 pb-16 px-6 rounded-b-[40px] shadow-sm text-white relative">
         <div className="flex items-center space-x-4">
            <img 
                src={user?.avatar || 'https://via.placeholder.com/100'} 
                alt="Avatar" 
                className="w-16 h-16 rounded-full border-2 border-white/50 bg-white object-cover"
            />
            <div>
                <h1 className="text-xl font-bold">{user?.name || '用户'}</h1>
                <p className="text-teal-100 text-sm">账号: {user?.username}</p>
            </div>
         </div>
         
         {/* 会员卡片悬浮 */}
         <div className="absolute left-4 right-4 -bottom-10 h-20 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-lg flex items-center justify-between px-6 text-amber-200">
             <div>
                <div className="text-sm font-bold flex items-center"><span className="mr-1">👑</span> 家政无忧会员</div>
                <div className="text-[10px] opacity-80">开通立享95折优惠</div>
             </div>
             <button className="bg-amber-200 text-gray-900 text-xs px-3 py-1.5 rounded-full font-bold">立即开通</button>
         </div>
      </div>

      <div className="mt-14 px-4 space-y-4">
         {/* 菜单列表 */}
         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
             {menuItems.map((item, index) => (
                 <div key={item.label} className={`flex items-center justify-between p-4 active:bg-gray-50 transition-colors cursor-pointer ${index !== menuItems.length -1 ? 'border-b border-gray-50' : ''}`}>
                     <div className="flex items-center space-x-3 text-gray-700">
                         <div className="text-gray-400">{item.icon}</div>
                         <span className="text-sm font-medium">{item.label}</span>
                     </div>
                     <div className="flex items-center space-x-2 text-gray-400">
                         <span className="text-xs">{item.value}</span>
                         <ChevronRight size={16} />
                     </div>
                 </div>
             ))}
         </div>

         {/* 退出登录 */}
         <button 
            onClick={handleLogout}
            className="w-full bg-white text-red-500 font-medium py-3 rounded-xl shadow-sm flex items-center justify-center space-x-2 active:bg-gray-50 transition-colors"
         >
             <LogOut size={18} />
             <span>退出登录</span>
         </button>

         <div className="text-center text-xs text-gray-300 pt-4">
             Current Version 1.0.0
         </div>
      </div>

      <BottomNav />
    </div>
  );
};