import { createAction, props } from '@ngrx/store';
import { Credentials, Product, Signup } from '@homeboi/api-interfaces';
import { Notification } from '@homeboi/api-interfaces';

export const loginAction = createAction(
  '[APP] login',
  props<{ credentials: Credentials }>()
);
export const loginSuccessAction = createAction(
  '[APP] loginSuccess',
  props<{ user: Signup }>()
);
export const loginErrorAction = createAction(
  '[APP] loginError',
  props<{ loginError: string }>()
);

export const signupAction = createAction(
  '[APP] signup',
  props<{ signup: Signup }>()
);

export const signupSuccessAction = createAction('[APP] signupSuccess');

export const getProductsAction = createAction('[APP] getProducts');

export const getProductsSuccessAction = createAction(
  '[APP] getProductsSuccess',
  props<{ products: Product[] }>()
);

export const setNotificationAction = createAction(
  '[APP] setNotification',
  props<{ notification: Notification }>()
);

export const resetNotificationsAction = createAction(
  '[APP] resetNotifications'
);
