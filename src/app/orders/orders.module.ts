import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DeliveryComponent, PaymentComponent, ConfirmationComponent } from './components';
import { Order } from './models/order.model/order.model.component'


@NgModule({
  declarations: [
    DeliveryComponent,
    PaymentComponent,
    ConfirmationComponent,
    Order.ModelComponent
  ],
  imports: [
    SharedModule
  ]
})
export class OrdersModule { }
