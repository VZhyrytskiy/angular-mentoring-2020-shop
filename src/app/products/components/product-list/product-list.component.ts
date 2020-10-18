import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/services/cart.service';

import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: ProductModel[] = [];

  constructor(private readonly productsService: ProductsService, private readonly cartService: CartService) { }

  onAddedToCart(product: ProductModel): void {
    this.cartService.addProductToCart(product);
  }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }
}
