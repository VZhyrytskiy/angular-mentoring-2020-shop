import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { ProductModel } from '../../models/product.model';
import { CartService } from 'src/app/cart/services/cart.service';
import { ProductsService } from '../../services/products.service';
import { Store } from '@ngrx/store';
import { addProductToCartItem } from 'src/app/shared/@ngrx/cart/cart.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Observable<ProductModel[]>;

  constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
    private readonly snackBar: MatSnackBar, private readonly store: Store) { }

  onAddedToCart(product: ProductModel): void {


    this.store.dispatch(addProductToCartItem({ product: product }));
    this.cartService.addProduct(product).then((addedProduct) => {
        const message = `Product ${addedProduct.name} was added to cart`;

        const snackBarConfig: MatSnackBarConfig = {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end'
        };

        this.snackBar.open(message, null, snackBarConfig);
      });
  }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }
}
