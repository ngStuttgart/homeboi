import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../+state/app.reducer';
import { Observable } from 'rxjs';
import { selectNotifications, selectUserAccountType } from '../+state/app.selectors';
import { Notification } from '@homeboi/api-interfaces';
import { deleteNotificationAction, deleteNotificationCountAction, getNotificationsAction } from '../+state/app.actions';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'homeboi-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public notifications$: Observable<Notification[] | undefined> = this.store.pipe(
    select(selectNotifications)
  );
  public displayedColumns: Array<any> = [
    'date',
    'message',
    'options'
  ];

  accountType = this.store.pipe(select(selectUserAccountType), map(accountType => '/' + accountType.toLowerCase()));

  constructor(private store: Store<AppState>, private location: Location) {
  }

  ngOnInit(): void {
    this.store.dispatch(getNotificationsAction());
    this.store.dispatch(deleteNotificationCountAction());
  }

  public removeNotification(notification: Notification): void {
    this.store.dispatch(deleteNotificationAction({ notification }));
  }

  goBack() {
    this.location.back();
  }
}
