import { ServiceItem, Merchant } from '../types';

// 商户信息维护对象
export const MERCHANTS: Record<string, Merchant> = {
  '2021006114625008': {
    id: '2021006114625008',
    name: '晨甘'
  },
  '2021006121657272': {
    id: '2021006121657272',
    name: '雷霆'
  },
  '2021006121623251': {
    id: '2021006121623251',
    name: '云创'
  },
  '2021006123684857': {
    id: '2021006123684857',
    name: '蓝海'
  },
  '2021006128692141': {
    id: '2021006128692141',
    name: '磬珏'
  }
};

// 根据商户id获取商户信息的辅助函数
export const getMerchantById = (merchantId: string): Merchant | undefined => {
  return MERCHANTS[merchantId];
};

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
    image: `https://plus.unsplash.com/premium_photo-1664372899494-774422f7ce61${IMG_PARAM}`,
    description: '标准居家表面清洁，包括客厅、卧室、厨房、卫生间表面擦拭与地面清洁。',
    rating: 4.8,
    sales: 1200,
    tags: ['最热销', '随时约'],
    features: ['自带工具', '身份核验', '不满意重做']
  },
    {
    id: '2',
    title: '日常保洁-活动价',
    price: 1,
    unit: '小时',
    // 更换为清洁手套擦拭的特写，加载更稳
    image: `https://plus.unsplash.com/premium_photo-1677681803187-bb618abc585b${IMG_PARAM}`,
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
    image: `https://plus.unsplash.com/premium_photo-1661719110458-f97f4b0a9bd4${IMG_PARAM}`,
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
    image: `https://plus.unsplash.com/premium_photo-1679858780488-13faaa89d175${IMG_PARAM}`,
    description: '小型搬家、同城货运，提供打包服务，明码标价无隐形消费。',
    rating: 4.5,
    sales: 180,
    tags: ['准时达', '无隐形消费'],
    features: ['电梯免费', '自带打包', 'GPS定位']
  },
  {
    id: '5',
    title: '管道疏通',
    price: 20,
    unit: '次',
    image: `https://plus.unsplash.com/premium_photo-1661662815924-97a8a767a262${IMG_PARAM}`,
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
    image: `https://plus.unsplash.com/premium_photo-1676143322259-7788cbf42540${IMG_PARAM}`,
    description: '经验丰富的住家保姆、月嫂，提供育儿、养老、烹饪等全方位服务。',
    rating: 4.9,
    sales: 80,
    tags: ['金牌月嫂', '持证上岗'],
    features: ['背景调查', '健康体检', '保险保障']
  },
  {
    id: '7',
    title: '上门维修',
    price: 10,
    unit: '次',
    image: `https://plus.unsplash.com/premium_photo-1663013675008-bd5a7898ac4f${IMG_PARAM}`,
    description: '专业维修家电、水电、家具等，快速上门，明码标价。',
    rating: 4.7,
    sales: 250,
    tags: ['快速响应', '专业维修'],
    features: ['免费上门', '配件保真', '保修30天']
  },
  {
    id: '9',
    title: '宠物护理',
    price: 100,
    unit: '次',
    image: `https://images.unsplash.com/photo-1583337130417-3346a1be7dee${IMG_PARAM}`,
    description: '专业宠物洗澡、美容、寄养服务，关爱您的宠物。',
    rating: 4.9,
    sales: 190,
    tags: ['爱心服务', '专业美容'],
    features: ['进口洗护', '环境消毒', '实时监控']
  }


];

// 订单数据类型定义
export interface Order {
  id: string;
  serviceTitle: string;
  image: string;
  price: number;
  date: string;
  status: string;
  // 支付宝回调参数
  timestamp?: string;
  trade_no?: string;
  method?: string;
  app_id?: string;
}

// 从localStorage获取订单数据
const getOrdersFromStorage = (): Order[] => {
  try {
    const storedOrders = localStorage.getItem('mockOrders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  } catch (error) {
    console.error('Failed to load orders from localStorage:', error);
    return [];
  }
};

// 保存订单数据到localStorage
const saveOrdersToStorage = (orders: Order[]) => {
  try {
    localStorage.setItem('mockOrders', JSON.stringify(orders));
  } catch (error) {
    console.error('Failed to save orders to localStorage:', error);
  }
};

// 初始订单数据
const initialOrders: Order[] = [
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

// 从localStorage加载订单数据，如果没有则使用初始数据
export let MOCK_ORDERS: Order[] = getOrdersFromStorage().length > 0 ? getOrdersFromStorage() : [...initialOrders];

// 添加或更新订单的函数
export const addOrder = (order: Omit<Order, 'date'> & { date?: string }) => {
  // 获取当前日期时间
  const now = new Date();
  const formattedDate = order.date || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  // 创建订单对象
  const orderToAdd: Order = {
    id: order.id,
    serviceTitle: order.serviceTitle,
    image: order.image,
    price: order.price,
    date: formattedDate,
    status: order.status || '待服务',
    // 添加支付宝回调参数
    timestamp: order.timestamp,
    trade_no: order.trade_no,
    method: order.method,
    app_id: order.app_id
  };
  
  // 检查订单号是否已存在
  const existingOrderIndex = MOCK_ORDERS.findIndex(o => o.id === order.id);
  
  if (existingOrderIndex >= 0) {
    // 如果存在，更新现有订单
    MOCK_ORDERS[existingOrderIndex] = {
      ...MOCK_ORDERS[existingOrderIndex],
      ...orderToAdd
    };
  } else {
    // 如果不存在，添加新订单
    MOCK_ORDERS = [orderToAdd, ...MOCK_ORDERS];
  }
  
  // 保存到localStorage
  saveOrdersToStorage(MOCK_ORDERS);
  
  return MOCK_ORDERS.find(o => o.id === order.id) || orderToAdd;
};

export const getServiceById = (id: string): ServiceItem | undefined => {
  return SERVICES.find(s => s.id === id);
};

export const simulateApiCall = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));