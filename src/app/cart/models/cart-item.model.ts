import { ProductModel } from 'src/app/products/models/product.model';

export interface CartItemModel {
    readonly product: ProductModel;
    readonly quantity: number;

    getTotalSum(): number;
}

export class CartItemModel implements CartItemModel {

    constructor(public readonly product: ProductModel,public readonly quantity: number) { }

    getTotalSum(): number {
        return this.product.price * this.quantity;
    }
}
