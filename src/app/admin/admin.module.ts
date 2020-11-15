import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminDashboardComponent } from './index';
import { AdminDashboardItemComponent } from './components/admin-dashboard-item/admin-dashboard-item.component';

@NgModule({
  declarations: [AdminDashboardComponent, AdminDashboardItemComponent],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
