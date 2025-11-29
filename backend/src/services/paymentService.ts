import alipaySdk from '../config/alipay';
import { AlipayFormData } from 'alipay-sdk';
import transactionLogger, { TransactionType, TransactionStatus } from '../utils/transactionLogger';
import logger from '../utils/logger';

export interface CreatePaymentParams {
  orderId: string;
  totalAmount: number;
  subject: string;
  body: string;
}

export class PaymentService {
  /**
   * 创建支付宝网页支付
   */
  createAlipayPagePayment(params: CreatePaymentParams): string {
   

    // 生成支付URL
    const paymentUrl = alipaySdk.pageExec('alipay.trade.page.pay', {
       bizContent: {
      out_trade_no: params.orderId,
      total_amount: params.totalAmount,
      subject: params.subject,
      body: params.body,
      product_code: 'FAST_INSTANT_TRADE_PAY',
      return_url: process.env.ALIPAY_RETURN_URL,
      notify_url: process.env.ALIPAY_NOTIFY_URL,
    },
    }) ;

    // 记录交易记录
    transactionLogger.createPaymentRecord(
      params.orderId,
      TransactionType.PAGE_PAY,
      params.totalAmount,
      params.subject,
      params.body
    );

    return paymentUrl;
  }

  /**
   * 创建支付宝手机网站支付
   */
  createAlipayWapPayment(params: CreatePaymentParams): string {
   

    const paymentUrl =  alipaySdk.pageExec("alipay.trade.wap.pay", {
    bizContent: {
      out_trade_no: params.orderId,
      total_amount: params.totalAmount,
      subject: params.subject,
      body: params.body,
      product_code: 'QUICK_WAP_WAY' ,
      return_url: process.env.ALIPAY_RETURN_URL,
      notify_url: process.env.ALIPAY_NOTIFY_URL,
    },
  });

    // 记录交易记录
    transactionLogger.createPaymentRecord(
      params.orderId,
      TransactionType.WAP_PAY,
      params.totalAmount,
      params.subject,
      params.body
    );

    return paymentUrl;
  }

  /**
   * 验证支付宝回调通知
   */
  verifyAlipayNotify(postData: any): boolean {
    return alipaySdk.checkNotifySign(postData);
  }

  /**
   * 处理支付宝回调通知
   */
  async handleAlipayNotify(postData: any): Promise<{ success: boolean; message: string }> {
    try {
      // 验证签名
      const isSignValid = this.verifyAlipayNotify(postData);
      if (!isSignValid) {
        return { success: false, message: 'Invalid signature' };
      }

      // 处理业务逻辑，比如更新订单状态
      const { out_trade_no, trade_status, trade_no, total_amount, subject } = postData;

      // 根据trade_status处理不同的支付结果
      if (trade_status === 'TRADE_SUCCESS' || trade_status === 'TRADE_FINISHED') {
        // 记录交易成功
        transactionLogger.writeRecord({
          id: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          orderId: out_trade_no,
          type: postData.product_code === 'QUICK_WAP_WAY' ? TransactionType.WAP_PAY : TransactionType.PAGE_PAY,
          status: TransactionStatus.SUCCESS,
          totalAmount: parseFloat(total_amount),
          subject: subject,
          alipayTradeNo: trade_no,
          createTime: new Date().toISOString(),
          updateTime: new Date().toISOString(),
          remark: `Alipay trade status: ${trade_status}`
        });
        
        logger.info(`Order ${out_trade_no} paid successfully, alipay trade no: ${trade_no}`);
      } else {
        // 记录其他交易状态
        transactionLogger.writeRecord({
          id: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          orderId: out_trade_no,
          type: postData.product_code === 'QUICK_WAP_WAY' ? TransactionType.WAP_PAY : TransactionType.PAGE_PAY,
          status: TransactionStatus.FAILED,
          totalAmount: parseFloat(total_amount || '0'),
          subject: subject || '',
          alipayTradeNo: trade_no,
          createTime: new Date().toISOString(),
          updateTime: new Date().toISOString(),
          remark: `Alipay trade status: ${trade_status}`
        });
        
        logger.info(`Order ${out_trade_no} has status: ${trade_status}`);
      }

      return { success: true, message: 'success' };
    } catch (error) {
      logger.error('Error handling alipay notify:', error);
      return { success: false, message: 'error' };
    }
  }
}

export default new PaymentService();
