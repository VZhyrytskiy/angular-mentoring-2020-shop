import { ProductModel } from 'src/app/products/models/product.model';

// можно так, а можно расширить интерфейс, используя extends
export interface CartItemModel {
    readonly product: ProductModel;
    quantity: number;
}
