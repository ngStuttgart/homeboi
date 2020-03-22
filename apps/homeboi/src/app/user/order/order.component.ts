import { Component, OnInit } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Booking } from '@homeboi/api-interfaces';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { CompanyState } from '../../company/+state/company.reducer';
import { MatDialog } from '@angular/material/dialog';
import { selectBookings } from '../+state/user.selectors';
import { getBookingsAction, handBackBookingAction } from '../+state/user.actions';

class BookingDataSource extends DataSource<Booking> {
  private destroy$ = new Subject<void>();

  constructor(private readonly bookings$: Observable<Booking[]>) {
    super();
  }

  connect(
    collectionViewer: CollectionViewer
  ): Observable<Booking[] | ReadonlyArray<Booking>> {
    return this.bookings$.pipe(takeUntil(this.destroy$));
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.destroy$.next();
  }
}

@Component({
  selector: 'homeboi-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  displayedColumns: Array<Partial<keyof Booking> | 'options'> = [
    'product',
    'start',
    'end',
    'options'
  ];

  bookings$: Observable<Booking[] | undefined> = this.store.pipe(
    select(selectBookings)
  );

  bookingDataSource = new BookingDataSource(this.bookings$);

  constructor(private store: Store<CompanyState>, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.store.dispatch(getBookingsAction());
  }

  handBackBooking(bookingId: string): void {
    this.store.dispatch(handBackBookingAction({ bookingId }));
  }

}
