import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InseratDetailsComponent } from './inserat-details.component';
import { InseratDetailsRoutingModule } from './inserat-details-routing.module';
import { SharedHeaderModule } from '@homeboi/shared/header';

@NgModule({
  declarations: [
    InseratDetailsComponent
  ],
  imports: [
    CommonModule,
    InseratDetailsRoutingModule,
    SharedHeaderModule
  ]
})
export class InseratDetailsModule {}
