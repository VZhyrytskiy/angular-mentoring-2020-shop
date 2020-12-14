import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { CartItemModel } from '../../models/cart-item.model';
import { go } from 'src/app/shared/@ngrx/router/router.actions';
import { CartFacade } from 'src/app/shared/@ngrx/cart/cart.facade';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  items$: Observable<ReadonlyArray<CartItemModel>>;
  totalSum$: Observable<number>;
  totalQuantity$: Observable<number>;
  isEmpty$: Observable<boolean>;

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

  constructor(private store: Store, private cartFacade: CartFacade) { }

  onItemQuantityDecreased(item: CartItemModel): void {
    this.cartFacade.decreaseQuantityByOne(item);
  }

  onItemQuantityIncreased(item: CartItemModel): void {
    this.cartFacade.increaseQuantityByOne(item);
  }

  onItemRemoved(item: CartItemModel): void {
    this.cartFacade.removeProduct(item.product);
  }

  onCheckoutClick(): void {
    const link = ['/order/delivery'];
    this.store.dispatch(go({ path: link }));
  }

  onClearClick(): void {
    this.cartFacade.clear();
  }

  ngOnInit(): void {
    this.items$ = this.cartFacade.items$;
    this.totalSum$ = this.cartFacade.totalSum$;
    this.totalQuantity$ = this.cartFacade.totalQuantity$;
    this.isEmpty$ = this.cartFacade.isEmpty$;
  }
}
