import { ApplicationRef, Injectable } from '@angular/core';
import { RxNgZoneScheduler } from 'ngx-rxjs-zone-scheduler';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { Observable, ReplaySubject } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';

const SOCKET_IO_OPTIONS: SocketIoConfig['options'] = {
  forceNew: true,
  reconnectionAttempts: Infinity,
  timeout: 3000,
  transports: ['websocket'],
  multiplex: true,
  autoConnect: false
};

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private connected$ = new ReplaySubject<boolean>();
  private socket: Socket;

  constructor(
    private applicationRef: ApplicationRef,
    private rxNgZoneScheduler: RxNgZoneScheduler
  ) {
    this.createSocket();
  }

  public createSocket(): void {
    this.socket = new Socket({
      url: '/',
      options: SOCKET_IO_OPTIONS
    });

    this.connectSocket();
  }

  public onReconnect(): Observable<number> {
    return this.fromEvent<number>('reconnect');
  }

  public onConnectError(): Observable<Error> {
    return this.fromEvent<Error>('connect_error');
  }

  public fromEvent<T>(eventName: string): Observable<T> {
    return this.connected$.pipe(
      first(connected => connected),
      switchMap(() => this.socket.fromEvent<T>(eventName)),
      this.rxNgZoneScheduler.observeOnNgZone()
    );
  }

  private connectSocket(): void {
    this.applicationRef.isStable.pipe(first(isStable => isStable)).subscribe(() => {
      this.socket.connect();
      this.connected$.next(true);
    });
  }
}
