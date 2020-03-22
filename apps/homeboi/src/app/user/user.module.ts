import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedProductCardModule } from '@homeboi/shared/product-card';
import { OrderComponent } from './order/order.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './+state/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './+state/user.effects';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [UserComponent, OrderComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects]),
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    SharedProductCardModule,
    HeaderModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class UserModule {
}
