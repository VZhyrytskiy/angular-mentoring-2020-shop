import { CartItemModel } from 'src/app/cart/models/cart-item.model';

export interface CartState {
    items: ReadonlyArray<CartItemModel>;
    readonly totalQuantity: number;
    readonly totalSum: number;
}

export const initialCartState: CartState = {
    items: [],
    totalQuantity: 0,
    totalSum: 0
};

