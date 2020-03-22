import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'orders',
    component: OrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
