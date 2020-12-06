import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent {

  constructor(private router: Router) { }

  @Input() model: ProductModel;
  @Output() productAdded = new EventEmitter<ProductModel>();

  onViewClick(): void {
    this.router.navigate([`/product/${this.model.id}`]);
  }

  onAddToCart(): void {
    this.productAdded.emit(this.model);
  }
}
