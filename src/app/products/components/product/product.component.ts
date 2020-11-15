import { ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart/services/cart.service';

import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  public averageScore: number;

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
    private readonly snackBar: MatSnackBar) { }

  public model: ProductModel;

  onAddToCart(): void {
    this.cartService.addProductToCart(this.model);
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const product = this.productsService.getProductById(id);

    if (product == null) {
      this.router.navigateByUrl('/not-found');
    }

    this.model = product;
    this.averageScore = Math.ceil(this.model.rates.reduce((prev, next) => prev + next, 0) / this.model.rates.length);
  }
}
