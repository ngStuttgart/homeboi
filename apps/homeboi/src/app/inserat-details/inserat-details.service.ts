import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../+state/app.reducer';
import { Observable } from 'rxjs';
import { SocketService } from '../sockets/socket.service';
import { selectUser } from '../+state/app.selectors';
import { filter, switchMap } from 'rxjs/operators';
import { Notification, Product } from '@homeboi/api-interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class InseratDetailsService {

  constructor(private readonly httpClient: HttpClient) { }

  getInserat(productId) {
    return this.httpClient.get<Product>(`/api/products/${productId}`);
  }
}
