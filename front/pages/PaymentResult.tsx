import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Home, FileText } from 'lucide-react';
import { Button } from '../components/Button';
import { addOrder, SERVICES } from '../services/mockData';

export const PaymentResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 从URL参数中获取支付状态和订单信息
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status') || 'success';
  const orderId = searchParams.get('orderId') || '';
  const amount = parseFloat(searchParams.get('amount') || '0');
  
  // 从location.state中获取备用数据（如果URL参数不存在）
  const state = location.state as { amount: number; orderId: string } | null;
  const finalOrderId = orderId || state?.orderId || 'ORD_UNKNOWN';
  const finalAmount = amount || state?.amount || 0;
  
  const isSuccess = status === 'success';

  // 处理支付回调，添加订单到模拟数据
  useEffect(() => {
    if (isSuccess && finalOrderId && finalAmount > 0) {
      // 根据订单ID或金额简单判断服务类型（实际项目中应该从订单详情获取）
      // 这里使用一个默认服务，实际项目中应该从后端获取完整的订单详情
      const service = SERVICES[0]; // 默认使用第一个服务
      
      // 添加订单到模拟数据，使用URL参数中的订单ID
      addOrder({
        id: finalOrderId,
        serviceTitle: service.title,
        image: service.image,
        price: finalAmount,
        status: '待服务' // 支付成功后默认状态为待服务
      });
    }
  }, [isSuccess, finalOrderId, finalAmount]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-6">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
        {isSuccess ? (
          <CheckCircle size={48} className="text-green-500" />
        ) : (
          <XCircle size={48} className="text-red-500" />
        )}
      </div>
      
      <h1 className={`text-2xl font-bold text-gray-900 mb-2`}>
        {isSuccess ? '支付成功' : '支付失败'}
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        {isSuccess ? '感谢您的预约，服务人员将尽快与您联系' : '支付失败，请重试或选择其他支付方式'}
      </p>

      <div className="w-full bg-gray-50 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-gray-500">订单编号</span>
            <span className="font-medium text-gray-800">{finalOrderId}</span>
        </div>
        <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-gray-500">支付方式</span>
            <span className="font-medium text-gray-800">支付宝</span>
        </div>
        <div className="border-t border-dashed border-gray-200 my-4"></div>
        <div className="flex justify-between items-center">
            <span className="text-gray-500">支付金额</span>
            <span className="text-xl font-bold text-gray-900">¥{finalAmount.toFixed(2)}</span>
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
            onClick={() => navigate('/orders')} 
            className="flex items-center justify-center space-x-2 border-none bg-gray-100"
        >
            <FileText size={18} />
            <span>查看订单详情</span>
        </Button>
      </div>
    </div>
  );
};
