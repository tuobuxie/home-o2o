import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Share2, CheckCircle, Star } from 'lucide-react';
import { SERVICES, getServiceById } from '../services/mockData';
import { ServiceItem } from '../types';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

export const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [service, setService] = useState<ServiceItem | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (id) {
      const data = getServiceById(id);
      if (data) setService(data);
    }
  }, [id]);

  const handleBookClick = () => {
    // 直接跳转到预约页，不需要登录
    navigate(`/booking/${service?.id}`);
  };

  if (!service) {
    return <div className="p-8 text-center text-gray-500">服务未找到</div>;
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* 顶部导航 */}
      <div className="relative h-64">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start bg-gradient-to-b from-black/50 to-transparent">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
            <ChevronLeft size={24} />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="px-5 py-6 -mt-6 bg-white rounded-t-[30px] relative z-10">
        
        {/* 标题价格 */}
        <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{service.title}</h1>
            <div className="text-teal-600 font-bold flex items-baseline">
                <span className="text-sm">¥</span>
                <span className="text-2xl">{service.price}</span>
                <span className="text-gray-500 text-sm font-normal ml-1">/{service.unit}</span>
            </div>
        </div>

        {/* 商户信息 */}
        <div className="flex items-center mb-4">
            <span className="text-xs text-gray-500">提供商：{service.merchantName}</span>
        </div>
        
        {/* 标签 */}
        <div className="flex space-x-2 mb-6">
            {service.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-teal-50 text-teal-600 text-xs rounded-md">
                    {tag}
                </span>
            ))}
        </div>

        {/* 服务保障 */}
        <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <div className="flex justify-between text-xs text-gray-600">
                {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                        <CheckCircle size={14} className="text-teal-500 mr-1" />
                        {feature}
                    </div>
                ))}
            </div>
        </div>

        {/* 详情描述 */}
        <div className="mb-8">
            <h3 className="font-bold text-lg mb-3 border-l-4 border-teal-500 pl-3">服务内容</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
                {service.description}
                <br /><br />
                我们提供专业的上门服务，所有服务人员均经过严格背景调查与专业技能培训。请提前一天预约，以确保服务时效。
            </p>
        </div>

        {/* 评价预览 */}
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg border-l-4 border-teal-500 pl-3">用户评价 (102)</h3>
                <span className="text-teal-500 text-sm flex items-center">查看全部 <ChevronLeft size={16} className="rotate-180" /></span>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
                <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                    <div className="flex-1">
                        <div className="text-sm font-medium">李女士</div>
                        <div className="flex text-orange-400">
                            {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                        </div>
                    </div>
                    <span className="text-xs text-gray-400">2023-10-12</span>
                </div>
                <p className="text-xs text-gray-600">阿姨打扫得很干净，准时到达，非常有礼貌，推荐！</p>
            </div>
        </div>
      </div>

      {/* 底部悬浮操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 px-6 pb-safe z-40 flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col text-sm text-gray-500 mr-4">
            <span>总价预估</span>
            <span className="text-teal-600 font-bold text-lg">¥{service.price}</span>
        </div>
        <Button 
            variant="primary" 
            className="flex-1 rounded-full shadow-lg shadow-teal-200"
            onClick={handleBookClick}
        >
            立即预约
        </Button>
      </div>
    </div>
  );
};