import fs from 'fs';
import path from 'path';
import logger from './logger';

// 交易记录类型
export enum TransactionStatus {
  CREATED = 'created',
  SUCCESS = 'success',
  FAILED = 'failed',
  PENDING = 'pending'
}

export enum TransactionType {
  PAGE_PAY = 'page_pay',
  WAP_PAY = 'wap_pay'
}

export interface TransactionRecord {
  id: string;
  orderId: string;
  type: TransactionType;
  status: TransactionStatus;
  totalAmount: number;
  subject: string;
  body?: string;
  alipayTradeNo?: string;
  createTime: string;
  updateTime: string;
  remark?: string;
}

export class TransactionLogger {
  private logDir: string;
  private logFile: string;

  constructor() {
    // 确保日志目录存在
    this.logDir = path.join(__dirname, '../../logs');
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }

    // 固定日志文件名：transactions.log
    this.logFile = path.join(this.logDir, 'transactions.log');
  }

  /**
   * 写入交易记录
   */
  writeRecord(record: TransactionRecord): void {
    try {
      // 转换为JSON字符串并添加换行符
      const logLine = JSON.stringify(record) + '\n';
      
      // 追加写入文件
      fs.appendFileSync(this.logFile, logLine, 'utf8');
    } catch (error) {
      logger.error('Error writing transaction log:', error);
    }
  }

  /**
   * 创建支付记录
   */
  createPaymentRecord(
    orderId: string,
    type: TransactionType,
    totalAmount: number,
    subject: string,
    body?: string,
  ): TransactionRecord {
    const record: TransactionRecord = {
      id: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      orderId,
      type,
      status: TransactionStatus.CREATED,
      totalAmount,
      subject,
      body,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString()
    };

    this.writeRecord(record);
    return record;
  }

  /**
   * 更新交易状态为成功
   */
  updateRecordSuccess(
    orderId: string,
    alipayTradeNo: string,
    remark?: string
  ): TransactionRecord {
    const record: TransactionRecord = {
      id: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      orderId,
      type: TransactionType.PAGE_PAY, // 默认类型，实际应根据订单查询
      status: TransactionStatus.SUCCESS,
      totalAmount: 0, // 实际应根据订单查询
      subject: '', // 实际应根据订单查询
      alipayTradeNo,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
      remark
    };

    this.writeRecord(record);
    return record;
  }

  /**
   * 更新交易状态为失败
   */
  updateRecordFailed(
    orderId: string,
    remark?: string
  ): TransactionRecord {
    const record: TransactionRecord = {
      id: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      orderId,
      type: TransactionType.PAGE_PAY, // 默认类型，实际应根据订单查询
      status: TransactionStatus.FAILED,
      totalAmount: 0, // 实际应根据订单查询
      subject: '', // 实际应根据订单查询
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
      remark
    };

    this.writeRecord(record);
    return record;
  }
}

export default new TransactionLogger();
