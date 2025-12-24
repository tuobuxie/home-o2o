import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../services/mockData';
import { MapPin, Search, Star } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

// 添加全局样式，隐藏滚动条
const GlobalStyles = () => (
  <style>
    {`
      /* 隐藏滚动条但保留滚动功能 */
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}
  </style>
);

export const Home: React.FC = () => {
  const navigate = useNavigate();
  // 状态管理
  const [selectedMerchant, setSelectedMerchant] = React.useState<string>('全部');
  
  // 轮播图状态管理
  const [currentSlide, setCurrentSlide] = React.useState<number>(0);
  
  // 轮播图数据
  const bannerSlides = [
    {
      id: 1,
      title: '新用户首单立减',
      description: '最高优惠 50 元',
      image: 'https://plus.unsplash.com/premium_photo-1661719110458-f97f4b0a9bd4?auto=format&fit=crop&w=1200&q=60',
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 2,
      title: '保洁清洗特惠',
      description: '专业保洁服务，低至 39 元起',
      image: 'https://plus.unsplash.com/premium_photo-1677681803187-bb618abc585b?auto=format&fit=crop&w=1200&q=60',
      color: 'from-teal-400 to-teal-500'
    },
    {
      id: 3,
      title: '家电清洗套餐',
      description: '清洗 2 件家电，立减 50 元',
      image: 'https://plus.unsplash.com/premium_photo-1664372899494-774422f7ce61?auto=format&fit=crop&w=1200&q=60',
      color: 'from-teal-600 to-teal-700'
    }
  ];
  
  // 提供商列表
  const merchants = ['全部', ...Array.from(new Set(SERVICES.map(service => service.merchantName)))];
  
  // 筛选服务
  const filteredServices = SERVICES.filter(service => {
    // 提供商筛选
    const matchesMerchant = selectedMerchant === '全部' || service.merchantName === selectedMerchant;
    
    return matchesMerchant;
  });
  
  // 自动轮播效果
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [bannerSlides.length]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <GlobalStyles />
      {/* 头部定位与搜索 */}
      <header className="bg-teal-500 p-4 pb-8 rounded-b-[30px] shadow-sm text-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-1">
              <MapPin size={18} />
              <span className="font-medium text-sm">北京市·朝阳区</span>
            </div>
            <div className="text-xs bg-teal-600 px-2 py-1 rounded-full">
              高温消毒季
            </div>
          </div>
          
          <div className="relative max-w-2xl">
            <input 
              type="text" 
              placeholder="搜索您需要的服务，如“空调清洗”" 
              className="w-full h-10 pl-10 pr-4 rounded-full bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none shadow-inner"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="max-w-6xl mx-auto px-4 -mt-4">
        
        {/* 轮播图 */}
        <div className="mb-6 relative">
          <div className="rounded-2xl shadow-lg overflow-hidden relative h-48">
            {/* 轮播图片 */}
            {bannerSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                {/* 背景图片 */}
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
                  {/* 渐变叠加层 */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-30`}></div>
                </div>
                
                {/* 轮播内容 */}
                <div className="relative h-full flex items-center p-6">
                  <div className="text-white max-w-md">
                    <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
                    <p className="text-lg opacity-90">{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* 轮播指示器 */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {bannerSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white opacity-50'}`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
            
            {/* 左右导航按钮 */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-colors"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-colors"
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>

        {/* 筛选区域 */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          {/* 提供商筛选 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">服务提供商</h3>
            <div className="flex overflow-x-auto pb-2 scrollbar-hide space-x-3">
              {merchants.map((merchant, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedMerchant(merchant)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedMerchant === merchant 
                    ? 'bg-teal-500 text-white shadow-md transform scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-teal-100'}`}
                >
                  {merchant}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 热门推荐列表 */}
        <h3 className="font-bold text-gray-800 text-lg mb-4">
          热门推荐
          {selectedMerchant !== '全部' && ` (${selectedMerchant})`}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              onClick={() => navigate(`/service/${service.id}`)}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg hover:shadow-teal-100 transition-all cursor-pointer active:bg-teal-50"
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-40 object-cover rounded-lg bg-gray-200 mb-3"
              />
              <div>
                <h4 className="font-bold text-gray-900 text-base mb-1">{service.title}</h4>
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">{service.description}</p>
                <p className="text-xs text-gray-500 mb-3">提供商：{service.merchantName}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span className="flex items-center text-orange-400">
                            <Star size={12} fill="currentColor" className="mr-0.5" />
                            {service.rating}
                        </span>
                        <span>已售 {service.sales}</span>
                    </div>
                    <div className="text-teal-600 font-bold">
                        <span className="text-xs">¥</span>
                        <span className="text-xl">{service.price}</span>
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