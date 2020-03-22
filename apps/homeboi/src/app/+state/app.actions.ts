import { createAction, props } from '@ngrx/store';
import { Credentials, Notification, Product, Signup } from '@homeboi/api-interfaces';

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

export const signupErrorAction = createAction(
  '[APP] signupError',
  props<{ signupError: string }>()
);

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

export const getNotificationsAction = createAction(
  '[APP] getNotifications'
);
export const getNotificationsSuccessAction = createAction(
  '[APP] getNotificationsSuccess',
  props<{ notifications: Notification[] }>()
);

export const getUserAction = createAction(
  '[APP] getUser'
);

export const getUserSuccessAction = createAction(
  '[APP] getUserSuccess',
  props<{ user: Signup }>()
);

export const getUserErrorAction = createAction(
  '[APP] getUserError',
  props<{ getUserError: string }>()
);

export const logoutAction = createAction(
  '[APP] logout'
);

export const logoutSuccessAction = createAction(
  '[APP] logoutSuccess'
);

export const deleteNotificationAction = createAction(
  '[APP] deleteNotification',
  props<{ notification: Notification }>()
);

export const deleteNotificationSuccessAction = createAction(
  '[APP] deleteNotificationSuccess',
  props<{ notifications: Notification[] }>()
);

