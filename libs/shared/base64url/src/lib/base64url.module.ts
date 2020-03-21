import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Base64urlPipe } from './base64url.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [Base64urlPipe],
  exports: [Base64urlPipe]
})
export class Base64urlModule {}
