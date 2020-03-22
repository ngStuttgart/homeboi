import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Booking, Product } from '@homeboi/api-interfaces';
import {
  addImageAction, getProductsSuccessAction,
  resetImageAction,
  resetProductAction,
  setProductAction,
  submitProductAction,
  submitProductSuccessAction
} from './company.actions';

export interface CompanyState {
  product: Partial<Product>;
  productSubmitted: boolean;
  products?: Product[];
  bookings?: Booking[];
}

export const initialCompanyState: CompanyState = {
  product: {},
  productSubmitted: false,
  products: undefined,
  bookings: undefined
};

export function companyReducer(state, action: Action) {
  return reducer(state, action);
}

const reducer: ActionReducer<CompanyState> = createReducer(
  initialCompanyState,
  on(
    addImageAction,
    (state, { image }): CompanyState => ({
      ...state,
      product: {
        ...state.product,
        image
      }
    })
  ),
  on(
    resetImageAction,
    (state): CompanyState => ({
      ...state,
      product: {
        ...state.product,
        image: undefined
      }
    })
  ),
  on(
    setProductAction,
    (state, { product }): CompanyState => ({
      ...state,
      product: {
        ...state.product,
        ...product
      }
    })
  ),
  on(
    resetProductAction,
    (state): CompanyState => ({
      ...state,
      productSubmitted: false,
      product: {}
    })
  ),
  on(
    submitProductAction,
    (state): CompanyState => ({
      ...state,
      productSubmitted: true
    })
  ),
  on(
    submitProductSuccessAction,
    (state): CompanyState => ({
      ...state,
      productSubmitted: false,
      product: {}
    })
  ),
  on(getProductsSuccessAction, (state, {products}): CompanyState => ({
    ...state,
    products
  }))
);
