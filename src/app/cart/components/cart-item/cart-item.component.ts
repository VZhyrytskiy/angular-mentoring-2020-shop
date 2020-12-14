import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CartItemModel } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {

  @Input() item: CartItemModel;

  @Output() itemQuantityIncreased = new EventEmitter<CartItemModel>();
  @Output() itemQuantityDecreased = new EventEmitter<CartItemModel>();
  @Output() itemRemoved = new EventEmitter<CartItemModel>();

  onDecreaseByOne(): void {
    this.itemQuantityDecreased.emit(this.item);
  }

  onIncreaseByOne(): void {
    this.itemQuantityIncreased.emit(this.item);
  }

  onRemoved(): void {
    this.itemRemoved.emit(this.item);
  }
}
