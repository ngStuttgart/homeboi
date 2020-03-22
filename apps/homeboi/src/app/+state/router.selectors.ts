import { createFeatureSelector } from '@ngrx/store';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';

export interface RouterState {
  router: RouterReducerState<any>;
}

export const selectRouter = createFeatureSelector<RouterState, RouterReducerState<any>>('router');

export const { selectUrl, selectRouteParam } = getSelectors(selectRouter);
