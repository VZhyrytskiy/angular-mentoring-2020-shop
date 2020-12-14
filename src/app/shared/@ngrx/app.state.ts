import { CartState } from './cart';
import { ProductsState } from './products';
import { UsersState } from './users';

export interface AppState {
    cart: CartState;
    products: ProductsState;
    users: UsersState;
}
