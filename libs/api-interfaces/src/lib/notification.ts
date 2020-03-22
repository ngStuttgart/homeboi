export interface Notification {
  id?: string;
  type: NotificationType;
  message: string;
  date: Date;
}

export enum NotificationType {
  BOOKING = 'BOOKING',
  RETURN_PRODUCT = 'RETURN_PRODUCT',
  RATED = 'RATED'
}
