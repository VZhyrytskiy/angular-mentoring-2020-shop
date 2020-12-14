import { ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { addProductToCartItem } from 'src/app/shared/@ngrx/cart/cart.actions';
import { selectProductByUrl } from 'src/app/shared/@ngrx/products';
import { ProductModel } from './../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {

  product: ProductModel;

  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(private store: Store) { }

  onAddToCart(): void {
    this.store.dispatch(addProductToCartItem({ product: this.product }));
  }

  ngOnInit(): void {
    this.store.select(selectProductByUrl).pipe(
      tap(product => this.product = product),
      takeUntil(this.componentDestroyed$)
    ).subscribe();
  }

  getAverageScore(): number {
    const ratesSum = this.product.rates.reduce((prev, next) => prev + next, 0);

    return Math.ceil(ratesSum / this.product.rates.length);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
