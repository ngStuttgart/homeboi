import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Product } from '@homeboi/api-interfaces';
import {
  addImageAction,
  resetImageAction,
  resetProductAction,
  setProductAction,
  submitProductAction,
  submitProductSuccessAction
} from './company.actions';

export interface CompanyState {
  product: Partial<Product>;
  productSubmitted: boolean;
}

export const initialCompanyState: CompanyState = {
  product: {},
  productSubmitted: false
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
  )
);
