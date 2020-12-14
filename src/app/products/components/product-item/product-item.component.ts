import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as RouterActions from 'src/app/shared/@ngrx/router/router.actions';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent {

  constructor(private store: Store) { }

  @Input() model: ProductModel;
  @Output() productAdded = new EventEmitter<ProductModel>();

  onViewClick(): void {
    const link = ['/product/', this.model.id];
    this.store.dispatch(RouterActions.go({ path: link }));
  }

  onAddToCart(): void {
    this.productAdded.emit(this.model);
  }
}
