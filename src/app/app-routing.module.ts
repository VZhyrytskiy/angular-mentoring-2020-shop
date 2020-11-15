import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent, ProductListComponent } from './products/index';
import { CartListComponent } from './cart/index';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AdminDashboardComponent } from './admin';
import { AdminGuard } from './admin/admin.guard';

const routes: Routes = [
  { path: 'cart', component: CartListComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AdminGuard]
  },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
