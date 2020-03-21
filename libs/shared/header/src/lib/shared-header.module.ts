import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatFormFieldModule, MatButtonModule, MatIconModule, RouterModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class SharedHeaderModule {}
