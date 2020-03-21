import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../+state/app.reducer';
import { Observable } from 'rxjs';
import { selectNotifications } from '../+state/app.selectors';
import { Notification } from '@homeboi/api-interfaces';

@Component({
  selector: 'homeboi-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  notifications$: Observable<Notification[] | undefined> = this.store.pipe(
    select(selectNotifications)
  );

  constructor(private store: Store<AppState>) { }
}
