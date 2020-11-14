import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent, ProductListComponent } from './products/index';
import { CartListComponent } from './cart/index';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: 'cart', component: CartListComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product-not-found', redirectTo: '**' },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
