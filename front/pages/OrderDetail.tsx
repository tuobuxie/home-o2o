import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { MOCK_ORDERS } from '../services/mockData';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import { CalendarDays, ShoppingBag, ArrowLeft } from 'lucide-react';

// 状态标签颜色映射
const getStatusColor = (status: string) => {
  switch (status) {
    case '待服务': return 'text-orange-500 bg-orange-50';
    case '已完成': return 'text-gray-500 bg-gray-100';
    case '待支付': return 'text-red-500 bg-red-50';
    default: return 'text-teal-600 bg-teal-50';
  }
};

export const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // 查找订单详情
  const order = MOCK_ORDERS.find(o => o.id === id);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 pb-24">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">订单不存在</h2>
        <p className="text-gray-500 mb-8 text-center">该订单可能已被删除或不存在</p>
        <Button onClick={() => navigate('/orders')} className="w-32">返回订单列表</Button>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 顶部导航栏 */}
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center">
        <button onClick={() => navigate('/orders')} className="mr-4">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">订单详情</h1>
      </div>

      {/* 订单基本信息 */}
      <div className="bg-white p-4 mt-2">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-50">
          <div>
            <span className="block text-sm text-gray-500 mb-1">订单号</span>
            <span className="text-base font-medium text-gray-900">{order.id}</span>
          </div>
          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>

        {/* 服务信息 */}
        <div className="space-y-4">
          <div>
            <span className="block text-sm text-gray-500 mb-2">服务信息</span>
            <div className="flex space-x-3">
              <img 
                src={order.image} 
                alt={order.serviceTitle} 
                className="w-20 h-20 rounded-lg object-cover bg-gray-200"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-base">{order.serviceTitle}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <CalendarDays size={14} className="mr-1" />
                  {order.date}
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <span className="font-bold text-gray-900 text-lg">¥{order.price}</span>
              </div>
            </div>
          </div>

          {/* 支付信息 */}
          <div className="pt-3 border-t border-gray-50">
            <span className="block text-sm text-gray-500 mb-2">支付信息</span>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">支付状态</span>
                <span className="text-sm font-medium text-gray-900">
                  {order.status === '已完成' ? '已支付' : order.status === '待服务' ? '已支付' : '待支付'}
                </span>
              </div>
              {order.trade_no && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">交易单号</span>
                  <span className="text-sm text-gray-900">{order.trade_no}</span>
                </div>
              )}
              {order.method && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">支付方式</span>
                  <span className="text-sm text-gray-900">{order.method === 'alipay_trade_app_pay' ? '支付宝' : order.method}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 底部操作按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">实付金额</span>
            <span className="text-xl font-bold text-gray-900 ml-2">¥{order.price}</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" className="flex-1 py-2.5">联系客服</Button>
          {order.status === '已完成' && (
            <Button className="flex-1 py-2.5">再来一单</Button>
          )}
          {order.status === '待服务' && (
            <Button className="flex-1 py-2.5">确认完成</Button>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
