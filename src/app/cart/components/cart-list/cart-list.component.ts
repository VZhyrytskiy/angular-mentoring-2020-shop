import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { CartItemModel } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
import { CartListOrderByOption, CartListSortDirectionOption, CartOrderByOptions, CartSortDirectionOptions } from './cart-list.constants';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  items: Observable<Array<CartItemModel>>;
  totalSum: Observable<number>;

  orderBySelectedOptionValue: string;
  orderByOptions: CartListOrderByOption[];

  orderBySortDirectionOptions: CartListSortDirectionOption[];
  orderByIsAscending: boolean;

  constructor(private readonly cartService: CartService) { }

  onItemQuantityDecreased(item: CartItemModel): void {
    this.cartService.decreaseQuantityByOne(item.product);
  }

  onItemQuantityIncreased(item: CartItemModel): void {
    this.cartService.increaseQuantityByOne(item.product);
  }

  onItemRemoved(item: CartItemModel): void {
    this.cartService.removeProductFromCart(item.product);
  }

  ngOnInit(): void {
    this.orderByOptions = CartOrderByOptions;
    this.orderBySortDirectionOptions = CartSortDirectionOptions;
    this.orderByIsAscending = this.orderBySortDirectionOptions.find(x => x.isDefault).isAscending;
    this.orderBySelectedOptionValue = this.orderByOptions[0].value;
    this.items = this.cartService.getCartItems();
    this.totalSum = this.cartService.totalSum();
  }
}

