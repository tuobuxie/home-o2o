import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { MOCK_ORDERS } from '../services/mockData';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import { CalendarDays, ShoppingBag } from 'lucide-react';

export const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // 状态标签颜色映射
  const getStatusColor = (status: string) => {
    switch (status) {
      case '待服务': return 'text-orange-500 bg-orange-50';
      case '已完成': return 'text-gray-500 bg-gray-100';
      case '待支付': return 'text-red-500 bg-red-50';
      default: return 'text-teal-600 bg-teal-50';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 pb-24">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6 text-gray-400">
            <ShoppingBag size={40} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">您还没有登录</h2>
        <p className="text-gray-500 mb-8 text-center">登录后查看您的订单信息</p>
        <Button onClick={() => navigate('/login')} className="w-32">去登录</Button>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-lg font-bold text-gray-900 text-center">我的订单</h1>
      </div>

      <div className="p-4 space-y-4">
        {MOCK_ORDERS.length > 0 ? (
          MOCK_ORDERS.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-50">
                <span className="text-xs text-gray-500">订单号: {order.id}</span>
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex space-x-3 mb-3">
                <img 
                  src={order.image} 
                  alt={order.serviceTitle} 
                  className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{order.serviceTitle}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <CalendarDays size={12} className="mr-1" />
                    {order.date}
                  </div>
                </div>
                <div className="flex flex-col items-end justify-center">
                   <span className="font-bold text-gray-900">¥{order.price}</span>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                 <Button variant="secondary" className="py-1.5 px-3 text-xs h-auto">联系客服</Button>
                 {order.status === '已完成' && (
                    <Button variant="outline" className="py-1.5 px-3 text-xs h-auto">再来一单</Button>
                 )}
                 {order.status === '待服务' && (
                    <Button variant="primary" className="py-1.5 px-3 text-xs h-auto">确认完成</Button>
                 )}
              </div>
            </div>
          ))
        ) : (
           <div className="flex flex-col items-center justify-center pt-20 text-gray-400">
             <ShoppingBag size={48} className="mb-4 text-gray-300" />
             <p>暂无订单记录</p>
           </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};