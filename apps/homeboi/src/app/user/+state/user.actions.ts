import { createAction, props } from '@ngrx/store';
import { Booking } from '@homeboi/api-interfaces';

export const getBookingsAction = createAction('[USER] getBookings');
export const getBookingsActionSuccess = createAction(
  '[USER] getBookingsSuccess',
  props<{ bookings: Booking[] }>()
);

export const handBackBookingAction = createAction('[USER] handBackBooking', props<{ bookingId: string }>());
export const handBackBookingActionSuccess = createAction('[USER] handBackBookingSuccess');
