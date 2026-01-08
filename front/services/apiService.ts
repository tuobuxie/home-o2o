/**
 * API服务配置
 * 
 * 环境变量加载优先级（Vite）：
 * 1. .env.local (最高优先级，本地覆盖，不提交到git)
 * 2. .env.[mode].local (如 .env.development.local)
 * 3. .env.[mode] (如 .env.development, .env.production)
 * 4. .env (默认配置)
 * 
 * 当前运行模式：
 * - 开发: npm run dev -> 使用 .env.development + .env.local
 * - 生产: npm run build -> 使用 .env.production + .env.local
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// 环境变量验证（开发环境）
if (import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL) {
  console.warn(
    '⚠️ 警告: 未设置 VITE_API_BASE_URL 环境变量，使用默认值:',
    API_BASE_URL
  );
}

/**
 * 创建支付宝支付
 */
export interface CreatePaymentParams {
  orderId: string;
  totalAmount: number;
  subject: string;
  body: string;
  merchantId: string;
}

export interface CreatePaymentResponse {
  success: boolean;
  paymentUrl: string;
  error?: string;
}

export const createAlipayPayment = async (params: CreatePaymentParams): Promise<CreatePaymentResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/payment/alipay/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('创建支付宝支付失败:', error);
    return {
      success: false,
      paymentUrl: '',
      error: '创建支付失败，请稍后重试',
    };
  }
};

/**
 * 创建支付宝手机网站支付
 */
export const createAlipayWapPayment = async (params: CreatePaymentParams): Promise<CreatePaymentResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/payment/alipay/wap/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('创建支付宝手机网站支付失败:', error);
    return {
      success: false,
      paymentUrl: '',
      error: '创建支付失败，请稍后重试',
    };
  }
};
