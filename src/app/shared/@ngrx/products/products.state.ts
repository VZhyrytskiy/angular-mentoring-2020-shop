import { ProductModel } from 'src/app/products/models/product.model';

export interface ProductsState {
    items: ReadonlyArray<ProductModel>;
    loaded: boolean;
}

export const initialProductsState: ProductsState = {
    items: [],
    loaded: false
};

