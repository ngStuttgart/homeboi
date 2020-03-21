import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';

@NgModule({
  declarations: [CompanyComponent],
  imports: [CommonModule, CompanyRoutingModule]
})
export class CompanyModule {}
