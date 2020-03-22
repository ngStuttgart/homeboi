import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InseratDetailsComponent } from './inserat-details.component';

const routes: Routes = [
  {
    path: ':productId',
    component: InseratDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InseratDetailsRoutingModule {}
