export interface ServiceItem {
  id: string;
  title: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  rating: number;
  sales: number;
  tags: string[];
  features: string[];
  merchantId: string;
  merchantName: string;
}

export interface BookingFormState {
  contactName: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  quantity: number; // 时长或次数
  notes: string;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}
