import { Component, OnInit } from '@angular/core';
import { CartItemModel } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  items: CartItemModel[] = [];

  constructor(private cartService: CartService) {
    // this.items = new CartService().getCartItems();
   }

  ngOnInit(): void {
    this.items = this.cartService.getCartItems();
  }

}
