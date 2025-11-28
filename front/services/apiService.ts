// API服务配置
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

/**
 * 创建支付宝支付
 */
export interface CreatePaymentParams {
  orderId: string;
  totalAmount: number;
  subject: string;
  body: string;
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
