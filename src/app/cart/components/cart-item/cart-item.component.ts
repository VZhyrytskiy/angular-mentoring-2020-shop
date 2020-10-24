import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CartItemModel } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() item: CartItemModel;

  @Output() itemQuantityIncreased: EventEmitter<CartItemModel> = new EventEmitter<CartItemModel>();
  @Output() itemQuantityDecreased: EventEmitter<CartItemModel> = new EventEmitter<CartItemModel>();
  @Output() itemRemoved: EventEmitter<CartItemModel> = new EventEmitter<CartItemModel>();

  constructor(private readonly cartService: CartService) {
  }

  onDecreaseByOne(): void {
    this.itemQuantityDecreased.emit(this.item);
  }

  onIncreaseByOne(): void {
    this.itemQuantityIncreased.emit(this.item);
  }

  onRemoved(): void {
    this.itemRemoved.emit(this.item);
  }

  getTotalPrice(): number {
    return this.cartService.getCartItemTotalPrice(this.item);
  }

  ngOnInit(): void {
  }
}
