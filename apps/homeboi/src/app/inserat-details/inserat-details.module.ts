import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InseratDetailsComponent } from './inserat-details.component';
import { InseratDetailsRoutingModule } from './inserat-details-routing.module';
import { SharedHeaderModule } from '@homeboi/shared/header';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    InseratDetailsComponent
  ],
  imports: [
    CommonModule,
    InseratDetailsRoutingModule,
    SharedHeaderModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule
  ]
})
export class InseratDetailsModule {}
