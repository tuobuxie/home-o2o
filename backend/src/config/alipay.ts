import dotenv from 'dotenv';
import { AlipaySdk } from 'alipay-sdk';

dotenv.config();

const alipaySdk = new AlipaySdk({
  appId: process.env.ALIPAY_APP_ID || '',
  privateKey: process.env.ALIPAY_PRIVATE_KEY || '',
  alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY || '',
  gateway: process.env.ALIPAY_GATEWAY || 'https://openapi.alipaydev.com/gateway.do',
  charset: 'utf-8',
  signType: 'RSA2',
});

export default alipaySdk;
