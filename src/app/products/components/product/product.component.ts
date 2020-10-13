import { Component, Input, OnInit } from '@angular/core';

import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor() { }

  @Input() model: ProductModel;

  onBuy(): void {
    console.log(`Someone just bought ${this.model.name}`);
  }

  ngOnInit(): void {
  }

}
