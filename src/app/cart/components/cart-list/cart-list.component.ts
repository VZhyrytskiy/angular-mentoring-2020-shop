import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { CartItemModel } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, DoCheck {

  items: ReadonlyArray<CartItemModel> = [];

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

  getCartTotalPrice(): number {
    return this.cartService.getCartTotalPrice();
  }

  ngOnInit(): void {
    this.items = this.cartService.getCartItems();
  }

  ngDoCheck(): void {
    this.items = this.cartService.getCartItems();
  }
}
