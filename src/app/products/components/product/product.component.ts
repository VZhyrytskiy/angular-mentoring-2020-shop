import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor() { }

  @Input() model: ProductModel;

  @Output() addedToCart: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

  onAddToCart(): void {
    this.addedToCart.emit(this.model);
  }

  ngOnInit(): void { }
}
