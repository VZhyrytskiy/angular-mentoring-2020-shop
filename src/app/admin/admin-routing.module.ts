import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureNotAvailableComponent } from '../shared/components/feature-not-available/feature-not-available.component';

import { AdminGuard } from './admin.guard';
import { AdminDashboardComponent} from './index';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard],
    canActivateChild: [AdminGuard],
    children: [
      {
        path: '', component: AdminDashboardComponent
      },
      {
        path: 'products/create', component: FeatureNotAvailableComponent
      },
      {
        path: 'products/edit/:id', component: FeatureNotAvailableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
