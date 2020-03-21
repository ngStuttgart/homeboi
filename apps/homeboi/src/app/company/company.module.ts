import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { InseratComponent } from './inserat/inserat.component';
import { StoreModule } from '@ngrx/store';
import { companyReducer } from './+state/company.reducer';
import { Base64urlModule } from '@homeboi/shared/base64url';
import { EffectsModule } from '@ngrx/effects';
import { CompanyEffects } from './+state/company.effects';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaymentDurationModule } from '@homeboi/shared/payment-duration-pipe';
import { ProductTypeModule } from '@homeboi/shared/product-type';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [CompanyComponent, InseratComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    Base64urlModule,
    StoreModule.forFeature('company', companyReducer),
    EffectsModule.forFeature([CompanyEffects]),
    MatChipsModule,
    CdkTableModule,
    MatTableModule,
    MatProgressSpinnerModule,
    PaymentDurationModule,
    ProductTypeModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule
  ]
})
export class CompanyModule {}
