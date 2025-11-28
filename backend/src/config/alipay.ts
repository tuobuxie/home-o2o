import dotenv from 'dotenv';
import { AlipaySdk } from 'alipay-sdk';

dotenv.config();

// 添加日志记录用于排查环境变量配置
console.log('=== Alipay Config Debug Info ===');
console.log('ALIPAY_APP_ID:', process.env.ALIPAY_APP_ID );
console.log('ALIPAY_PRIVATE_KEY:', process.env.ALIPAY_PRIVATE_KEY);
console.log('ALIPAY_PUBLIC_KEY:', process.env.ALIPAY_PUBLIC_KEY);
console.log('ALIPAY_GATEWAY:', process.env.ALIPAY_GATEWAY || 'default');
console.log('===============================');

const alipaySdk = new AlipaySdk({
  appId: process.env.ALIPAY_APP_ID || '',
  privateKey: process.env.ALIPAY_PRIVATE_KEY || '',
  alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY || '',
  gateway: process.env.ALIPAY_GATEWAY || 'https://openapi.alipaydev.com/gateway.do',
  charset: 'utf-8',
  signType: 'RSA2',
});

export default alipaySdk;
