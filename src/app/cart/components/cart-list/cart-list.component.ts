import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { CartItemModel } from '../../models/cart-item.model';
import * as CartSelectors from 'src/app/shared/@ngrx/cart/cart.selectors';
import * as CartActions from 'src/app/shared/@ngrx/cart/cart.actions';
import { go } from 'src/app/shared/@ngrx/router/router.actions';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  items: Observable<ReadonlyArray<CartItemModel>>;
  totalSum: Observable<number>;
  totalQuantity: Observable<number>;
  isEmpty: Observable<boolean>;

  orderByOptions =
    [
      {
        value: 'product.name',
        displayValue: 'Product name'
      },
      {
        value: 'product.price',
        displayValue: 'Unit price'
      },
      {
        value: 'quantity',
        displayValue: 'Unit quantity'
      }
    ];

  orderBySortDirectionOptions = [
    {
      isAscending: true,
      isDefault: true,
      displayValue: 'Ascending'
    },
    {
      isAscending: false,
      isDefault: false,
      displayValue: 'Descending'
    }
  ];

  orderBySelectedOptionValue = this.orderByOptions[0].value;
  orderByIsAscending = this.orderBySortDirectionOptions
    .find(option => option.isDefault).isAscending;

  constructor(private store: Store) { }

  onItemQuantityDecreased(item: CartItemModel): void {
    this.store.dispatch(CartActions.decreaseCartItemQuantityByOne({ cartItem: item }));
  }

  onItemQuantityIncreased(item: CartItemModel): void {
    this.store.dispatch(CartActions.increaseCartItemQuantityByOne({ cartItem: item }));
  }

  onItemRemoved(item: CartItemModel): void {
    this.store.dispatch(CartActions.removeProductFromCart({ product: item.product }));
  }

  onCheckoutClick(): void {
    const link = ['/order/delivery'];
    this.store.dispatch(go({ path: link }));
  }

  onClearClick(): void {
    this.store.dispatch(CartActions.removeAllProductsFromCart());
  }

  ngOnInit(): void {
    this.items = this.store.select(CartSelectors.selectCartItems);
    this.totalSum = this.store.select(CartSelectors.selectTotalSum);
    this.totalQuantity = this.store.select(CartSelectors.selectTotalQuantity);
    this.isEmpty = this.store.select(CartSelectors.selectIsEmpty);
  }
}
