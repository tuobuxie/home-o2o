import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, FileText } from 'lucide-react';
import { Button } from '../components/Button';

export const PaymentResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { amount: number; orderId: string } | null;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle size={48} className="text-green-500" />
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-2">支付成功</h1>
      <p className="text-gray-500 text-sm mb-8">感谢您的预约，服务人员将尽快与您联系</p>

      <div className="w-full bg-gray-50 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-gray-500">订单编号</span>
            <span className="font-medium text-gray-800">{state?.orderId || 'ORD_UNKNOWN'}</span>
        </div>
        <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-gray-500">支付方式</span>
            <span className="font-medium text-gray-800">支付宝</span>
        </div>
        <div className="border-t border-dashed border-gray-200 my-4"></div>
        <div className="flex justify-between items-center">
            <span className="text-gray-500">支付金额</span>
            <span className="text-xl font-bold text-gray-900">¥{state?.amount || '0.00'}</span>
        </div>
      </div>

      <div className="w-full space-y-4">
        <Button 
            variant="primary" 
            fullWidth 
            onClick={() => navigate('/')}
            className="flex items-center justify-center space-x-2"
        >
            <Home size={18} />
            <span>返回首页</span>
        </Button>
        <Button 
            variant="secondary" 
            fullWidth
            onClick={() => navigate('/orders')} // 实际场景应跳转到订单列表
            className="flex items-center justify-center space-x-2 border-none bg-gray-100"
        >
            <FileText size={18} />
            <span>查看订单详情</span>
        </Button>
      </div>
    </div>
  );
};
