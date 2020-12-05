import { ProductModel } from 'src/app/products/models/product.model';

export interface ProductsState {
    items: ReadonlyArray<ProductModel>;
}

export const initialProductsState: ProductsState = {
    items: []
};

