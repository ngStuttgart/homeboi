import { createAction, props } from '@ngrx/store';
import { Product } from '@homeboi/api-interfaces';

export const addImageAction = createAction(
  '[COMPANY] addImage',
  props<{ image: string }>()
);
export const resetImageAction = createAction('[COMPANY] resetImage');

export const setProductAction = createAction(
  '[COMPANY] setProduct',
  props<{ product: Partial<Product> }>()
);
export const resetProductAction = createAction('[COMPANY] resetProduct');

export const submitProductAction = createAction('[COMPANY] submitProduct');
export const submitProductSuccessAction = createAction(
  '[COMPANY] submitProductSuccess'
);

export const getProductsAction = createAction('[COMPANY] getProducts');
export const getProductsSuccessAction = createAction(
  '[COMPANY] getProductsSuccess',
  props<{products: Product[]}>()
);
