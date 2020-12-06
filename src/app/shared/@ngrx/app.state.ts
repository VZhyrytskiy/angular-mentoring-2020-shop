import { CartState } from './cart';
import { ProductsState } from './products';

export interface AppState {
    cart: CartState;
    products: ProductsState;
}
