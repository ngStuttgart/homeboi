import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, pluck, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Booking } from '@homeboi/api-interfaces';
import {
  getBookingsAction,
  getBookingsActionSuccess,
  handBackBookingAction,
  handBackBookingActionSuccess
} from './user.actions';

@Injectable({ providedIn: 'root' })
export class UserEffects {

  getBookings$ = createEffect(
    () => this.actions$.pipe(
      ofType(getBookingsAction),
      switchMap(() => this.httpClient.get<Booking[]>('/api/bookings/foruser')),
      map(bookings => getBookingsActionSuccess({ bookings }))
    ),
    { useEffectsErrorHandler: true });

  handBackBooking$ = createEffect(
    () => this.actions$.pipe(
      ofType(handBackBookingAction),
      pluck('bookingId'),
      switchMap((bookingId: string) => this.httpClient.put(`/api/bookings/${bookingId}/hand-back`, undefined)),
      map(() => handBackBookingActionSuccess())
    ),
    { useEffectsErrorHandler: true });

  constructor(private actions$: Actions, private httpClient: HttpClient) {
  }
}
