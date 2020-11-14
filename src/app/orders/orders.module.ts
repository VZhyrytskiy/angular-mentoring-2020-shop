import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';

import { DeliveryComponent, PaymentComponent, ConfirmationComponent } from './index';

@NgModule({
  declarations: [
    DeliveryComponent,
    PaymentComponent,
    ConfirmationComponent
  ],
  imports: [
    SharedModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
