export interface Product {
  id: string;
  productType: ProductType;
  description: string;
  title: string;
  tags: string[];
  width: number;
  height: number;
  depth: number;
  price: number;
  available?: boolean;
  paymentDuration: PaymentDuration;
  image: string;
}

export enum ProductType {
  MONITOR = 'MONITOR',
  TISCH = 'TISCH',
  STUHL = 'STUHL',
  MAUS = 'MAUS',
  TASTATUR = 'TASTATUR',
  HEADSET = 'HEADSET',
  DRUCKER = 'DRUCKER',
  LAUTSPRECHER = 'LAUTSPRECHER',
  WEBCAM = 'WEBCAM',
  WHITEBOARD = 'WHITEBOARD',
  AUTOMATISCHE_ERKENNUNG = 'AUTOMATISCHE_ERKENNUNG',
  SONSTIGES = 'SONSTIGES'
}

export enum PaymentDuration {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  ONCE = 'ONCE',
}
