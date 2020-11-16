import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent, ProductListComponent } from './products';
import { CartListComponent } from './cart';
import { NotFoundComponent } from './shared';
import { AdminGuard } from './admin';
import { CartIsNotEmptyGuard } from './orders';

const routes: Routes = [
  { path: 'cart', component: CartListComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'not-found', component: NotFoundComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AdminGuard]
  },
  {
    path: 'order',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
    canLoad: [CartIsNotEmptyGuard]
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
