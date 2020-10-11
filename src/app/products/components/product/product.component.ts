import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(public model: ProductModel) { }

  onBuy() {
    console.log(`Someone just bought ${this.model.name}`);
  }

  ngOnInit(): void {
  }

}
