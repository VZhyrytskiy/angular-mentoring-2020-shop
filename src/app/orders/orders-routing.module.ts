import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmationComponent, DeliveryComponent, PaymentComponent } from './index';

const routes: Routes = [
  {
    path: 'order',
    children: [
      { path: 'confirmation', component: ConfirmationComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'delivery', component: DeliveryComponent },
      { path: '', redirectTo: '/delivery', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
