import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, MapPin, Clock, Calendar, ShieldCheck, Loader2, ScanLine } from 'lucide-react';
import { getServiceById, simulateApiCall } from '../services/mockData';
import { createAlipayPayment, createAlipayWapPayment } from '../services/apiService';
import { ServiceItem, BookingFormState } from '../types';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

// 支付弹窗组件 (保持不变)
const PaymentModal: React.FC<{
  isOpen: boolean;
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}> = ({ isOpen, amount, onClose, onSuccess }) => {
  const [status, setStatus] = useState<'generating' | 'waiting' | 'success'>('generating');

  useEffect(() => {
    if (isOpen) {
      setStatus('generating');
      // 模拟生成二维码耗时
      const timer1 = setTimeout(() => setStatus('waiting'), 800);
      
      // 模拟用户扫码支付耗时
      const timer2 = setTimeout(() => {
        if (isOpen) {
            setStatus('success');
            setTimeout(onSuccess, 800);
        }
      }, 4000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isOpen, onSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full sm:w-[360px] bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* 支付宝头部 */}
        <div className="bg-[#1677FF] p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <div className="font-bold text-lg">支付宝</div>
                <div className="text-xs bg-white/20 px-1.5 py-0.5 rounded">安全支付</div>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white text-2xl font-light leading-none">&times;</button>
        </div>

        <div className="p-6 flex flex-col items-center bg-white">
            <div className="text-sm text-gray-500 mb-1">家政无忧服务费</div>
            <div className="text-3xl font-bold text-gray-900 mb-6">
                <span className="text-xl">¥</span>{amount.toFixed(2)}
            </div>

            {/* 二维码区域 */}
            <div className="relative w-48 h-48 bg-gray-100 p-2 rounded-lg mb-6 shadow-inner">
                {status === 'generating' ? (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <Loader2 className="animate-spin mr-2" /> 生成中...
                    </div>
                ) : (
                    <>
                        <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=alipay_pay_${amount}`} 
                            alt="Payment QR" 
                            className={`w-full h-full mix-blend-multiply transition-opacity duration-300 ${status === 'success' ? 'opacity-20' : 'opacity-100'}`} 
                        />
                        {/* 扫描线动画 */}
                        {status === 'waiting' && (
                            <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500/50 shadow-[0_0_10px_#3b82f6] animate-[scan_2s_ease-in-out_infinite]"></div>
                            </div>
                        )}
                        {/* 成功状态 */}
                        {status === 'success' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#1677FF] font-bold animate-in zoom-in duration-300">
                                <div className="w-12 h-12 bg-[#1677FF] rounded-full flex items-center justify-center text-white mb-2">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                支付成功
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="flex items-center space-x-2 text-sm text-[#1677FF]">
                {status === 'waiting' ? (
                    <>
                        <ScanLine size={16} className="animate-pulse" />
                        <span>请使用支付宝扫一扫</span>
                    </>
                ) : status === 'success' ? (
                    <span>即将跳转...</span>
                ) : (
                    <span>正在连接网关...</span>
                )}
            </div>
            
            <div className="mt-8 text-xs text-gray-400">
                订单号: {Math.floor(Date.now() / 1000)}
            </div>
        </div>
        
        {/* 底部模拟按钮 */}
        <div className="p-4 bg-gray-50 border-t border-gray-100">
             <button 
                className="w-full py-2.5 bg-[#1677FF] text-white rounded-lg font-medium active:bg-blue-600 transition-colors"
                onClick={() => {
                    if(status === 'waiting') {
                        setStatus('success');
                        setTimeout(onSuccess, 800);
                    }
                }}
             >
                打开支付宝APP支付
             </button>
        </div>
      </div>
    </div>
  );
};

export const Booking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  const [service, setService] = useState<ServiceItem | null>(null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 表单状态
  const [form, setForm] = useState<BookingFormState>({
    contactName: '张先生', 
    phone: '13800138000',
    address: '北京市朝阳区三里屯SOHO A座',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    quantity: 1,
    notes: ''
  });

  // 去掉登录检查，允许未登录用户下单

  useEffect(() => {
    if (id) {
      const data = getServiceById(id);
      if (data) setService(data);
    }
  }, [id]);

  const calculateTotal = () => {
    if (!service) return 0;
    return service.price * form.quantity;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (delta: number) => {
    setForm(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + delta)
    }));
  };

  // 检测是否为移动设备
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const handleSubmit = async () => {
    if (!form.contactName || !form.phone || !form.address) {
      alert('请填写完整联系信息');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 创建订单ID
      const orderId = `ORD-${Date.now()}`;
      const totalAmount = calculateTotal();
      
      // 根据设备类型选择支付API
      const paymentApi = isMobileDevice() ? createAlipayWapPayment : createAlipayPayment;
      
      // 调用后端API创建支付宝支付
      const result = await paymentApi({
        orderId,
        totalAmount,
        subject: service?.title || '家政服务',
        body: `家政服务：${service?.title || '服务'} - ${form.quantity}${service?.unit || '项'}`,
      });
      
      if (result.success && result.paymentUrl) {
        // 创建一个隐藏的div来渲染支付宝返回的HTML表单
        const paymentDiv = document.createElement('div');
        paymentDiv.style.display = 'none';
        paymentDiv.innerHTML = result.paymentUrl;
        document.body.appendChild(paymentDiv);

        // 自动提交表单（支付宝返回的script已经包含提交逻辑，这里做双重保障）
        const form1 = paymentDiv.querySelector('form');
        if (form1) {
          form1.submit();
        }
        
        // 支付宝的HTML中包含自动提交脚本，会自动执行跳转到支付页面
      } else {
        alert(result.error || '创建支付失败，请稍后重试');
      }
    } catch (error) {
      console.error('支付创建失败:', error);
      alert('创建支付失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayModal(false);
    navigate('/result', { 
        state: { 
            amount: calculateTotal(), 
            orderId: `ORD-${Date.now()}` 
        } 
    });
  };

  // 去掉登录检查，允许未登录用户下单

  if (!service) return <div className="p-8 text-center text-gray-500">加载中...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 导航头 */}
      <div className="bg-white p-4 sticky top-0 z-10 flex items-center shadow-sm">
        <button onClick={() => navigate(-1)} className="p-1 mr-2 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">确认订单</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* 服务卡片 */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex space-x-4">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-20 h-20 object-cover rounded-lg bg-gray-200"
          />
          <div className="flex-1 flex flex-col justify-between">
            <h3 className="font-bold text-gray-900">{service.title}</h3>
            <p className="text-xs text-gray-500 line-clamp-1">{service.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-teal-600 font-bold">¥{service.price}/{service.unit}</span>
              
              {/* 数量选择器 */}
              <div className="flex items-center space-x-3 bg-gray-100 rounded-lg px-2 py-1">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 disabled:opacity-50"
                  disabled={form.quantity <= 1}
                >
                  -
                </button>
                <span className="text-sm font-medium w-4 text-center text-gray-900">{form.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 表单区域 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center space-x-2">
                <ShieldCheck size={18} className="text-teal-500" />
                <span className="font-bold text-gray-800">服务信息</span>
            </div>
            
            <div className="p-4 space-y-4">
                <div className="space-y-1">
                    <label className="text-xs text-gray-500 ml-1">联系人</label>
                    <input 
                        type="text" 
                        name="contactName"
                        value={form.contactName}
                        onChange={handleInputChange}
                        className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                        placeholder="请输入姓名"
                    />
                </div>
                
                <div className="space-y-1">
                    <label className="text-xs text-gray-500 ml-1">联系电话</label>
                    <input 
                        type="tel" 
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none placeholder-gray-400"
                        placeholder="请输入手机号"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs text-gray-500 ml-1">上门地址</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            name="address"
                            value={form.address}
                            onChange={handleInputChange}
                            className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg p-3 pl-10 text-sm focus:ring-2 focus:ring-teal-500 outline-none placeholder-gray-400"
                            placeholder="小区/门牌号"
                        />
                        <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs text-gray-500 ml-1">上门日期</label>
                        <div className="relative">
                            <input 
                                type="date" 
                                name="date"
                                value={form.date}
                                onChange={handleInputChange}
                                className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg p-3 pl-10 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                            <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-gray-500 ml-1">上门时间</label>
                        <div className="relative">
                            <input 
                                type="time" 
                                name="time"
                                value={form.time}
                                onChange={handleInputChange}
                                className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg p-3 pl-10 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                            <Clock className="absolute left-3 top-3 text-gray-400" size={18} />
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs text-gray-500 ml-1">备注需求</label>
                    <textarea 
                        name="notes"
                        value={form.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none placeholder-gray-400 resize-none"
                        placeholder="例如：家里有宠物、需要带梯子等"
                    />
                </div>
            </div>
        </div>
        
        {/* 支付方式 */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
            <span className="font-bold text-gray-800 text-sm">支付方式</span>
            <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-[#1677FF] rounded-sm flex items-center justify-center text-white text-[10px] font-bold">支</div>
                <span className="text-sm font-medium text-gray-900">支付宝支付</span>
                <div className="w-4 h-4 rounded-full border border-[#1677FF] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-[#1677FF] rounded-full"></div>
                </div>
            </div>
        </div>

      </div>

      {/* 底部结算 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 px-6 pb-safe z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-xs text-gray-500">待支付</span>
                <div className="flex items-baseline text-teal-600 font-bold">
                    <span className="text-sm">¥</span>
                    <span className="text-2xl">{calculateTotal()}</span>
                </div>
            </div>
            <Button 
                variant="alipay" 
                className="w-40 rounded-full shadow-lg shadow-blue-200"
                onClick={handleSubmit}
                isLoading={isSubmitting}
            >
                立即支付
            </Button>
        </div>
      </div>

      <PaymentModal 
        isOpen={showPayModal} 
        amount={calculateTotal()} 
        onClose={() => setShowPayModal(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};