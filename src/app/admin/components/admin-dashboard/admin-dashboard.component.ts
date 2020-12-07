import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ProductModel } from 'src/app/products/models/product.model';
import { selectProductItems } from 'src/app/shared/@ngrx/products';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  public products: Observable<ReadonlyArray<ProductModel>>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.products = this.store.select(selectProductItems);
  }
}
