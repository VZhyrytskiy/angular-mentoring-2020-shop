import { ProductModel } from 'src/app/products/models/product.model';

export interface CartItemModel {
    readonly product: ProductModel;
    quantity: number;
}
