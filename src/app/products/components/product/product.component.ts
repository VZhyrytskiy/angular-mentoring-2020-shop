import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { addProductToCartItem } from 'src/app/shared/@ngrx/cart/cart.actions';
import { ProductModel } from './../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  product: ProductModel;
  averageScore: number;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) { }

  onAddToCart(): void {
    this.store.dispatch(addProductToCartItem({ product: this.product }));
  }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data.product;
    const ratesSum = this.product.rates.reduce((prev, next) => prev + next, 0);
    this.averageScore = Math.ceil(ratesSum / this.product.rates.length);
  }
}
