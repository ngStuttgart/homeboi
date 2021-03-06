import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import {
  addNotificationCountAction, deleteNotificationAction, deleteNotificationCountAction,
  deleteNotificationSuccessAction,
  getNotificationsSuccessAction,
  getProductsAction,
  getProductsSuccessAction,
  getUserAction,
  getUserErrorAction,
  getUserSuccessAction,
  loginErrorAction,
  loginSuccessAction,
  logoutAction,
  resetNotificationsAction,
  setNotificationAction,
  signupAction,
  signupErrorAction,
  signupSuccessAction
} from './app.actions';
import { Notification, Product, Signup } from '@homeboi/api-interfaces';

export interface AppState {
  user?: Signup;
  products: Product[];
  productsLoading: boolean;
  loginError?: string;
  notifications?: Notification[];
  getUserError?: string;
  signupSubmitted: boolean;
  signupError?: string;
  notificationCount: number;
}

export const initialAppState: AppState = {
  user: undefined,
  products: [],
  productsLoading: false,
  loginError: undefined,
  notifications: undefined,
  getUserError: undefined,
  signupSubmitted: false,
  signupError: undefined,
  notificationCount: 0
};

export function appReducer(state: AppState, action: Action) {
  return reducer(state, action);
}

export const reducer: ActionReducer<AppState> = createReducer(
  initialAppState,
  on(signupAction, (state): AppState => ({
    ...state,
    signupSubmitted: true
  })),
  on(signupSuccessAction, (state): AppState => ({
    ...state,
    signupSubmitted: false
  })),
  on(signupErrorAction, (state, { signupError }): AppState => ({
    ...state,
    signupSubmitted: false,
    signupError
  })),
  on(
    loginSuccessAction,
    (state: AppState, { user }): AppState => ({
      ...state,
      getUserError: undefined,
      user
    })
  ),
  on(
    loginErrorAction,
    (state: AppState, { loginError }): AppState => ({
      ...state,
      loginError
    })
  ),
  on(
    getProductsAction,
    (state: AppState): AppState => ({
      ...state,
      productsLoading: true
    })
  ),
  on(
    getProductsSuccessAction,
    (state: AppState, { products }): AppState => ({
      ...state,
      productsLoading: false,
      products
    })
  ),
  on(
    setNotificationAction,
    (state: AppState, { notification }): AppState => ({
      ...state,
      notifications: [...(state.notifications || []), notification]
    })
  ),
  on(
    resetNotificationsAction,
    (state): AppState => ({
      ...state,
      notifications: undefined
    })
  ),
  on(
    getNotificationsSuccessAction,
    (state: AppState, { notifications }): AppState => ({
      ...state,
      notifications
    })
  ),
  on(
    getUserAction,
    (state): AppState => ({
      ...state
    })
  ),
  on(
    getUserSuccessAction,
    (state, { user }): AppState => ({
      ...state,
      getUserError: undefined,
      user
    })
  ),
  on(
    getUserErrorAction,
    (state, { getUserError }): AppState => ({
      ...state,
      user: undefined,
      getUserError
    })
  ),
  on(logoutAction, () => ({
    ...initialAppState
  })),
  on(
    deleteNotificationSuccessAction,
    (state: AppState, { notifications }): AppState => ({
      ...state,
      notifications
    })
  ),
  on(
    addNotificationCountAction,
    (state: AppState): AppState => ({
      ...state,
      notificationCount: state.notificationCount + 1
    })
  ),
  on(
    deleteNotificationCountAction,
    (state: AppState): AppState => ({
      ...state,
      notificationCount: 0
    })
  )
);
