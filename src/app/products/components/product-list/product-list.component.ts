import { Component, OnInit } from '@angular/core';

import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: ProductModel[] = [];

  constructor(private productService: ProductsService) {
    // В даном случае так можно, но лучше полагаться на конструктор и не создавать зависимость самостоятельно
    // this.products = new ProductsService().getProducts();
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

}
