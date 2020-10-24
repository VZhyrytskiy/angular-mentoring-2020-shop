import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItemModel } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() item: CartItemModel;

  @Output() itemQuantityIncreased: EventEmitter<CartItemModel> = new EventEmitter<CartItemModel>();
  @Output() itemQuantityDecreased: EventEmitter<CartItemModel> = new EventEmitter<CartItemModel>();
  @Output() productRemoved: EventEmitter<CartItemModel> = new EventEmitter<CartItemModel>();

  constructor() {
  }

  onDecreaseByOne(): void {
    this.itemQuantityDecreased.emit(this.item);
  }

  onIncreaseByOne(): void {
    this.itemQuantityIncreased.emit(this.item);
  }

  onProductRemoved(): void {
    this.itemQuantityIncreased.emit(this.item);
  }

  ngOnInit(): void {
  }
}
