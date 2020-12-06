import { Component, Input } from '@angular/core';

import { ProductModel } from 'src/app/products/models/product.model';

@Component({
  selector: 'app-admin-dashboard-item',
  templateUrl: './admin-dashboard-item.component.html',
  styleUrls: ['./admin-dashboard-item.component.scss']
})
export class AdminDashboardItemComponent {

  @Input() item: ProductModel;

}
