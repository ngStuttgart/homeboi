import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InseratDetailsComponent } from './inserat-details.component';
import { InseratDetailsRoutingModule } from './inserat-details-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../header/header.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PaymentDurationModule } from '@homeboi/shared/payment-duration-pipe';

@NgModule({
  declarations: [
    InseratDetailsComponent
  ],
  imports: [
    CommonModule,
    InseratDetailsRoutingModule,
    HeaderModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    FormsModule,
    MatSnackBarModule
    FormsModule,
    PaymentDurationModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
  ]
})
export class InseratDetailsModule {}
