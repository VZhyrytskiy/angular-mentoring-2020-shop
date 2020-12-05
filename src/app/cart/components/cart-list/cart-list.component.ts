import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Observable } from 'rxjs';

import { CartItemModel } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
import {
  CartListOrderByOption, CartListSortDirectionOption,
  CartOrderByOptions, CartSortDirectionOptions
} from './cart-list.constants';

import { select, Store } from '@ngrx/store';
import {
  selectCartItems, selectIsEmpty,
  selectTotalQuantity, selectTotalSum
} from 'src/app/shared/@ngrx/cart/cart.selectors';

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

  constructor(private readonly cartService: CartService, private readonly router: Router, private readonly store: Store) { }

  onItemQuantityDecreased(item: CartItemModel): void {
    this.cartService.decreaseQuantityByOne(item.product);
  }

  onItemQuantityIncreased(item: CartItemModel): void {
    this.cartService.increaseQuantityByOne(item.product);
  }

  onItemRemoved(item: CartItemModel): void {
    this.cartService.removeProduct(item.product);
  }

  onCheckoutClick(): void {
    this.router.navigateByUrl('/order/delivery');
  }

  onClearClick(): void {
    this.cartService.removeAllProducts();
  }

  ngOnInit(): void {
    this.orderByOptions = CartOrderByOptions;
    this.orderBySortDirectionOptions = CartSortDirectionOptions;
    this.orderByIsAscending = this.orderBySortDirectionOptions.find(x => x.isDefault).isAscending;
    this.orderBySelectedOptionValue = this.orderByOptions[0].value;

    this.items = this.store.pipe(select(selectCartItems));
    this.totalSum = this.store.pipe(select(selectTotalSum));
    this.totalQuantity = this.store.pipe(select(selectTotalQuantity));
    this.isEmpty = this.store.pipe(select(selectIsEmpty));
  }
}

