import { Router } from 'express';
import paymentController from '../controllers/paymentController';

const router = Router();

// 支付宝支付相关路由
router.post('/alipay/create', paymentController.createAlipayPayment);
router.post('/alipay/wap/create', paymentController.createAlipayWapPayment);
router.post('/alipay/notify', paymentController.handleAlipayNotify);
router.get('/alipay/return', paymentController.handleAlipayReturn);

export default router;
