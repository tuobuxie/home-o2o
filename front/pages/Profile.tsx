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

  // 菜单选中状态管理
  const [selectedMenu, setSelectedMenu] = React.useState<string>('');

  // 去掉登录检查，允许未登录用户查看个人中心

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
      <div className="bg-teal-500 pt-12 pb-16 px-6  shadow-sm text-white relative">
         <div 
           className="flex items-center space-x-4 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
           onClick={() => !isAuthenticated && navigate('/login')}
         >
            <img 
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=60'} 
                alt="Avatar" 
                className={`w-16 h-16 rounded-full border-2 object-cover transition-all duration-200 ${!isAuthenticated ? 'bg-white/50 hover:bg-white border-white hover:border-white/80' : 'bg-white border-white/50'}`}
            />
            <div className={`transition-colors duration-200 ${!isAuthenticated ? 'hover:text-white/90' : ''}`}>
                <h1 className="text-xl font-bold">{user?.name || '游客'}</h1>
                <p className="text-teal-100 text-sm">{user?.username ? `账号: ${user.username}` : '点击登录'}</p>
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
                 <div 
                   key={item.label} 
                   className={`flex items-center justify-between p-4 transition-all duration-200 cursor-pointer ${index !== menuItems.length -1 ? 'border-b border-gray-50' : ''} ${selectedMenu === item.label 
                     ? 'bg-teal-50 text-teal-700' 
                     : 'hover:bg-teal-50 hover:text-teal-600 active:bg-teal-100'}`}
                   onClick={() => setSelectedMenu(item.label)}
                 >
                     <div className="flex items-center space-x-3">
                         <div className={`${selectedMenu === item.label ? 'text-teal-500' : 'text-gray-400'} transition-colors`}>
                           {item.icon}
                         </div>
                         <span className={`text-sm font-medium ${selectedMenu === item.label ? 'text-teal-700' : 'text-gray-700'} transition-colors`}>
                           {item.label}
                         </span>
                     </div>
                     <div className="flex items-center space-x-2">
                         <span className={`text-xs ${selectedMenu === item.label ? 'text-teal-600' : 'text-gray-400'} transition-colors`}>
                           {item.value}
                         </span>
                         <ChevronRight 
                           size={16} 
                           className={`${selectedMenu === item.label ? 'text-teal-500' : 'text-gray-400'} transition-colors`}
                         />
                     </div>
                 </div>
             ))}
         </div>

         {/* 退出登录按钮 - 只有已登录用户可见 */}
         {isAuthenticated && (
             <button 
                onClick={handleLogout}
                className="w-full bg-white text-red-500 font-medium py-3 rounded-xl shadow-sm flex items-center justify-center space-x-2 active:bg-gray-50 transition-colors hover:bg-red-50"
             >
                 <LogOut size={18} />
                 <span>退出登录</span>
             </button>
         )}

         <div className="text-center text-xs text-gray-300 pt-4">
             Current Version 1.0.0
         </div>
      </div>

      <BottomNav />
    </div>
  );
};