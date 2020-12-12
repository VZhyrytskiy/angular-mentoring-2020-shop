import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { ProductModel } from '../../models/product.model';
import { addProductToCartItem } from 'src/app/shared/@ngrx/cart/cart.actions';
import * as CartActions from 'src/app/shared/@ngrx/cart/cart.actions';
import { selectProductItems } from 'src/app/shared/@ngrx/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Observable<ReadonlyArray<ProductModel>>;

  constructor(
    private snackBar: MatSnackBar,
    private store: Store,
    private actions$: Actions) {
  }

  onAddedToCart(product: ProductModel): void {
    this.store.dispatch(addProductToCartItem({ product }));
  }

  ngOnInit(): void {
    this.products = this.store.select(selectProductItems);

    this.actions$.pipe(ofType(CartActions.addProductToCartSuccess))
      .subscribe(action => this.showProductAddedMessage(action.addedProduct));
  }

  private showProductAddedMessage(addedProduct: ProductModel): void {
    const message = `Product ${addedProduct.name} was added to cart`;

    const snackBarConfig: MatSnackBarConfig = {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'end'
    };

    this.snackBar.open(message, null, snackBarConfig);
  }
}
