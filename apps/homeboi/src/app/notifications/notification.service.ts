import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../+state/app.reducer';
import { Observable } from 'rxjs';
import { SocketService } from '../sockets/socket.service';
import { selectUser } from '../+state/app.selectors';
import { filter, switchMap } from 'rxjs/operators';
import { Notification } from '@homeboi/api-interfaces';

@Injectable({providedIn: 'root'})
export class NotificationService {
  notification$: Observable<Notification> = this.store.pipe(
    select(selectUser),
    filter(Boolean),
    switchMap(({userId}) => this.socketService.fromEvent<Notification>(userId))
  );

  constructor(private store: Store<AppState>, private socketService: SocketService) { }
}
