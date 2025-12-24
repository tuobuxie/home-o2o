import dotenv from 'dotenv';
import { AlipaySdk } from 'alipay-sdk';
import logger from '../utils/logger';

dotenv.config();

interface AlipayConfig {
  appId: string;
  privateKey: string;
  alipayPublicKey: string;
  gateway: string;
  charset: 'utf-8';
  signType: 'RSA2';
}

/**
 * 根据商户ID获取支付宝配置
 * @param merchantId 商户ID，可选，默认为'2021006114625008'
 * @returns 支付宝配置对象
 */
const getAlipayConfig = (merchantId: string = '2021006114625008'): AlipayConfig => {
  // 添加日志记录用于排查环境变量配置
  logger.debug('=== Alipay Config Debug Info ===');
  logger.debug('Merchant ID:', merchantId);
  
  // 根据商户ID获取对应的环境变量
  const appId = process.env[`ALIPAY_APP_ID_${merchantId.toUpperCase()}`] || process.env[`ALIPAY_APP_ID_2021006114625008`] || '';
  const privateKey = process.env[`ALIPAY_PRIVATE_KEY_${merchantId.toUpperCase()}`] || process.env[`ALIPAY_PRIVATE_KEY_2021006114625008`] || '';
  const alipayPublicKey = process.env[`ALIPAY_PUBLIC_KEY_${merchantId.toUpperCase()}`] || process.env[`ALIPAY_PUBLIC_KEY_2021006114625008`] || '';
  const gateway = process.env.ALIPAY_GATEWAY || 'https://openapi.alipaydev.com/gateway.do';
  
  logger.debug('ALIPAY_APP_ID:', appId);
  logger.debug('ALIPAY_GATEWAY:', gateway);
  logger.debug('===============================');
  
  return {
    appId,
    privateKey,
    alipayPublicKey,
    gateway,
    charset: 'utf-8',
    signType: 'RSA2',
  };
};

/**
 * 支付宝SDK实例缓存，避免重复创建
 */
const alipaySdkCache: Map<string, AlipaySdk> = new Map();

/**
 * 根据商户ID获取支付宝SDK实例
 * @param merchantId 商户ID，可选，默认为'2021006114625008'
 * @returns 支付宝SDK实例
 */
const getAlipaySdk = (merchantId: string = '2021006114625008'): AlipaySdk => {
  // 检查缓存中是否已有实例
  if (alipaySdkCache.has(merchantId)) {
    return alipaySdkCache.get(merchantId)!;
  }
  
  // 创建新实例并缓存
  const config = getAlipayConfig(merchantId);
  const alipaySdk = new AlipaySdk(config);
  alipaySdkCache.set(merchantId, alipaySdk);
  
  return alipaySdk;
};

export default getAlipaySdk;
