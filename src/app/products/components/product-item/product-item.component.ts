import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/services/cart.service';

import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit {

  constructor(private router: Router,
              private readonly cartService: CartService) { }

  @Input() model: ProductModel;

  onViewClick(): void {
    this.router.navigate([`/product/${this.model.id}`]);
  }

  onAddToCart(): void {
    this.cartService.addProductToCart(this.model);
  }

  ngOnInit(): void { }
}
