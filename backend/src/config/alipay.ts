import dotenv from 'dotenv';
import { AlipaySdk } from 'alipay-sdk';
import logger from '../utils/logger';

dotenv.config();

// 添加日志记录用于排查环境变量配置
logger.debug('=== Alipay Config Debug Info ===');
logger.debug('ALIPAY_APP_ID:', process.env.ALIPAY_APP_ID );
logger.debug('ALIPAY_PRIVATE_KEY:', process.env.ALIPAY_PRIVATE_KEY);
logger.debug('ALIPAY_PUBLIC_KEY:', process.env.ALIPAY_PUBLIC_KEY);
logger.debug('ALIPAY_GATEWAY:', process.env.ALIPAY_GATEWAY || 'default');
logger.debug('===============================');

const alipaySdk = new AlipaySdk({
  appId: process.env.ALIPAY_APP_ID || '',
  privateKey: process.env.ALIPAY_PRIVATE_KEY || '',
  alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY || '',
  gateway: process.env.ALIPAY_GATEWAY || 'https://openapi.alipaydev.com/gateway.do',
  charset: 'utf-8',
  signType: 'RSA2',
});

export default alipaySdk;
