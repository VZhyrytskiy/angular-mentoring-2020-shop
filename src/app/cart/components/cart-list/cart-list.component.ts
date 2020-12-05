import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { CartItemModel } from '../../models/cart-item.model';
import * as CartSelectors from 'src/app/shared/@ngrx/cart/cart.selectors';
import * as CartActions from 'src/app/shared/@ngrx/cart/cart.actions';
import {
  CartListOrderByOption,
  CartListSortDirectionOption,
  CartOrderByOptions,
  CartSortDirectionOptions
} from './cart-list.constants';

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

  orderBySelectedOptionValue: string;
  orderByOptions: CartListOrderByOption[];

  orderBySortDirectionOptions: CartListSortDirectionOption[];
  orderByIsAscending: boolean;

  constructor(private router: Router, private store: Store) { }

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
    this.router.navigateByUrl('/order/delivery');
  }

  onClearClick(): void {
    this.store.dispatch(CartActions.removeAllProductsFromCart());
  }

  ngOnInit(): void {
    this.store.dispatch(CartActions.getLocalCartItems());
    this.orderByOptions = CartOrderByOptions;
    this.orderBySortDirectionOptions = CartSortDirectionOptions;
    this.orderByIsAscending = this.orderBySortDirectionOptions.find(x => x.isDefault).isAscending;
    this.orderBySelectedOptionValue = this.orderByOptions[0].value;

    this.items = this.store.pipe(select(CartSelectors.selectCartItems));
    this.totalSum = this.store.pipe(select(CartSelectors.selectTotalSum));
    this.totalQuantity = this.store.pipe(select(CartSelectors.selectTotalQuantity));
    this.isEmpty = this.store.pipe(select(CartSelectors.selectIsEmpty));
  }
}

