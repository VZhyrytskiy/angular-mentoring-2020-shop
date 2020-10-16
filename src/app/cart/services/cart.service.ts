import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';
import { CartItemComponent } from '../components/cart-item/cart-item.component';
import { CartItemModel } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    // private productsService: ProductsService;

    constructor(private productsService: ProductsService) {
        // this.productsService = new ProductsService();
    }

    getCartItems(): CartItemModel[] {
        return this.productsService
            .getProducts()
            .map(this.toCartItem);
    }

    private toCartItem(source: ProductModel): CartItemModel {
        return {
            name: source?.name,
            imageUrl: source?.imageUrl
        };
    }
}
