import { ServiceItem } from '../types';

export const MOCK_USER = {
  username: 'admin',
  password: '123456',
  name: '测试用户',
  // 使用较小的头像图片
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=60'
};

// 统一图片参数：宽度500px，质量60%，自动格式(WebP)
const IMG_PARAM = '?auto=format&fit=crop&w=500&q=60';

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: '日常保洁',
    price: 45,
    unit: '小时',
    // 更换为清洁手套擦拭的特写，加载更稳
    image: `https://images.unsplash.com/photo-1563453392212-326f5e854473${IMG_PARAM}`,
    description: '标准居家表面清洁，包括客厅、卧室、厨房、卫生间表面擦拭与地面清洁。',
    rating: 4.8,
    sales: 1200,
    tags: ['最热销', '随时约'],
    features: ['自带工具', '身份核验', '不满意重做']
  },
  {
    id: '3',
    title: '家电清洗',
    price: 128,
    unit: '台',
    // 更换为更清晰的厨房油烟机场景
    image: `https://images.unsplash.com/photo-1556909212-d5b604d0c90d${IMG_PARAM}`,
    description: '专业拆洗空调、洗衣机、冰箱、油烟机，杀菌除异味。',
    rating: 4.7,
    sales: 340,
    tags: ['健康生活'],
    features: ['高温蒸汽', '无损拆装', '售后保障']
  },
  {
    id: '4',
    title: '搬家货运',
    price: 280,
    unit: '车',
    // 更换为搬家纸箱图片，主题明确
    image: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c${IMG_PARAM}`,
    description: '小型搬家、同城货运，提供打包服务，明码标价无隐形消费。',
    rating: 4.5,
    sales: 180,
    tags: ['准时达', '无隐形消费'],
    features: ['电梯免费', '自带打包', 'GPS定位']
  },
  {
    id: '5',
    title: '管道疏通',
    price: 80,
    unit: '次',
    // 卫浴设施
    image: `https://images.unsplash.com/photo-1585704032915-c3400ca199e7${IMG_PARAM}`,
    description: '专业设备疏通马桶、地漏、洗菜盆、浴缸等各种管道堵塞。',
    rating: 4.6,
    sales: 210,
    tags: ['快速上门', '不通不收费'],
    features: ['专业设备', '清理现场', '保修7天']
  },
  {
    id: '6',
    title: '保姆月嫂',
    price: 6000,
    unit: '月',
    // 温馨的母婴/家庭场景
    image: `https://images.unsplash.com/photo-1519689680058-324335c77eba${IMG_PARAM}`,
    description: '经验丰富的住家保姆、月嫂，提供育儿、养老、烹饪等全方位服务。',
    rating: 4.9,
    sales: 80,
    tags: ['金牌月嫂', '持证上岗'],
    features: ['背景调查', '健康体检', '保险保障']
  }
];

export const MOCK_ORDERS = [
  {
    id: 'ORD-1715421001',
    serviceTitle: '日常保洁',
    image: SERVICES[0].image,
    price: 135,
    date: '2023-10-24 14:00',
    status: '已完成'
  },
  {
    id: 'ORD-1715421002',
    serviceTitle: '家电清洗',
    image: SERVICES[2].image,
    price: 128,
    date: '2023-11-02 09:30',
    status: '待服务'
  }
];

export const getServiceById = (id: string): ServiceItem | undefined => {
  return SERVICES.find(s => s.id === id);
};

export const simulateApiCall = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));