import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartListComponent } from './cart/components/cart-list/cart-list.component';
import { ProductListComponent } from './products/components/product-list/product-list.component';

const routes: Routes = [
  { path: 'cart', component: CartListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
