import { Request, Response } from 'express';
import paymentService from '../services/paymentService';
import logger from '../utils/logger';

export class PaymentController {
  /**
   * 创建支付宝网页支付
   */
  async createAlipayPayment(req: Request, res: Response): Promise<void> {
    try {
      const { orderId, totalAmount, subject, body, merchantId } = req.body;
      logger.info(`Creating alipay page payment for order ${orderId}, amount: ${totalAmount}, merchant: ${merchantId || 'default'}`);

      if (!orderId || !totalAmount || !subject) {
        logger.warn(`Missing required parameters for order ${orderId}: ${JSON.stringify(req.body)}`);
        res.status(400).json({ error: 'Missing required parameters' });
        return;
      }

      const paymentUrl = await paymentService.createAlipayPagePayment({
        orderId,
        totalAmount,
        subject,
        body,
        merchantId,
      });

      logger.info(`Alipay page payment created successfully for order ${orderId}`);
      res.json({ success: true, paymentUrl });
    } catch (error) {
      logger.error('Error creating alipay payment:', error);
      res.status(500).json({ error: 'Failed to create payment' });
    }
  }

  /**
   * 创建支付宝手机网站支付
   */
  async createAlipayWapPayment(req: Request, res: Response): Promise<void> {
    try {
      const { orderId, totalAmount, subject, body, merchantId } = req.body;
      logger.info(`Creating alipay wap payment for order ${orderId}, amount: ${totalAmount}, merchant: ${merchantId || 'default'}`);

      if (!orderId || !totalAmount || !subject) {
        logger.warn(`Missing required parameters for order ${orderId}: ${JSON.stringify(req.body)}`);
        res.status(400).json({ error: 'Missing required parameters' });
        return;
      }

      const paymentUrl = await paymentService.createAlipayWapPayment({
        orderId,
        totalAmount,
        subject,
        body,
        merchantId,
      });

      logger.info(`Alipay wap payment created successfully for order ${orderId}`);
      res.json({ success: true, paymentUrl });
    } catch (error) {
      logger.error('Error creating alipay wap payment:', error);
      res.status(500).json({ error: 'Failed to create payment' });
    }
  }

  /**
   * 处理支付宝回调通知
   */
  async handleAlipayNotify(req: Request, res: Response): Promise<void> {
    try {
      logger.info('Received alipay notify:', req.body);
      const result = await paymentService.handleAlipayNotify(req.body);
      logger.info(`Alipay notify handled successfully, result: ${result.message}`);
      res.send(result.message);
    } catch (error) {
      logger.error('Error handling alipay notify:', error);
      res.send('error');
    }
  }

  /**
   * 处理支付宝返回结果
   */
  handleAlipayReturn(req: Request, res: Response): void {
    // 支付宝同步返回结果，这里可以根据需要处理
    // 通常前端会直接处理返回的参数
    logger.info('Received alipay return:', req.query);
    res.json({ success: true, data: req.query });
  }
}

export default new PaymentController();
