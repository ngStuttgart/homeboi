import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyState } from './company.reducer';
import { Product } from '@homeboi/api-interfaces';

const selectCompany = createFeatureSelector('company');

export const selectProduct = createSelector(
  selectCompany,
  ({ product }: CompanyState): Partial<Product> => product
);

export const selectProductSubmitted = createSelector(
  selectCompany,
  ({ productSubmitted }: CompanyState): boolean => productSubmitted
);

export const selectProducts = createSelector(
  selectCompany,
  ({products}: CompanyState) => products
);
