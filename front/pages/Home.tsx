import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../services/mockData';
import { MapPin, Search, Star } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 头部定位与搜索 */}
      <header className="bg-teal-500 p-4 pb-8 rounded-b-[30px] shadow-sm text-white sticky top-0 z-30">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-1">
            <MapPin size={18} />
            <span className="font-medium text-sm">北京市·朝阳区</span>
          </div>
          <div className="text-xs bg-teal-600 px-2 py-1 rounded-full">
            高温消毒季
          </div>
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="搜索您需要的服务，如“空调清洗”" 
            className="w-full h-10 pl-10 pr-4 rounded-full bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none shadow-inner"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="px-4 -mt-4">
        
        {/* Banner */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex items-center justify-between overflow-hidden">
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">新用户首单立减</h2>
                <p className="text-teal-500 text-sm font-medium">最高优惠 50 元</p>
            </div>
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                <span className="text-2xl font-bold">¥50</span>
            </div>
        </div>

        {/* 服务分类 - 这里作为演示只列出标题 */}
        <div className="flex justify-between mb-6 px-2">
            {['保洁清洗', '家电维修', '搬家货运', '保姆月嫂'].map((cat, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        idx === 0 ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                        {/* 简单图标占位 */}
                        <div className="font-bold text-lg">{cat[0]}</div>
                    </div>
                    <span className="text-xs text-gray-600">{cat}</span>
                </div>
            ))}
        </div>

        {/* 热门推荐列表 */}
        <h3 className="font-bold text-gray-800 text-lg mb-4">热门推荐</h3>
        <div className="space-y-4">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              onClick={() => navigate(`/service/${service.id}`)}
              className="bg-white p-3 rounded-xl shadow-sm flex space-x-4 active:bg-gray-50 transition-colors cursor-pointer"
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0 bg-gray-200"
              />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h4 className="font-bold text-gray-900">{service.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{service.description}</p>
                </div>
                <div className="flex items-end justify-between">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span className="flex items-center text-orange-400">
                            <Star size={12} fill="currentColor" className="mr-0.5" />
                            {service.rating}
                        </span>
                        <span>已售 {service.sales}</span>
                    </div>
                    <div className="text-teal-600 font-bold">
                        <span className="text-xs">¥</span>
                        <span className="text-lg">{service.price}</span>
                        <span className="text-xs text-gray-400 font-normal">/{service.unit}</span>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};