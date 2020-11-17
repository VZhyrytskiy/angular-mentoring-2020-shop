import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent, AdminDashboardItemComponent } from './components';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminDashboardItemComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
