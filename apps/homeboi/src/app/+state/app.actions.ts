import { createAction, props } from '@ngrx/store';
import { Credentials, Signup } from '@homeboi/api-interfaces';

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
  props<{loginError: string}>()
);

export const signupAction = createAction(
  '[APP] signup',
  props<{ signup: Signup }>()
);

export const signupSuccessAction = createAction(
  '[APP] signupSuccess'
);
