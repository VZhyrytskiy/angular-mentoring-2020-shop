import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ProductModel } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  public products: Observable<ProductModel[]>;

  constructor(private readonly productsService: ProductsService) { }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }
}
