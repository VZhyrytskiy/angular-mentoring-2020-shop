import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationComponent, DeliveryComponent, PaymentComponent } from './components';



const routes: Routes = [
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
