import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { CartItemModel } from '../../../cart/models/cart-item.model';

export interface CartState extends EntityState<CartItemModel> {
    readonly totalQuantity: number;
    readonly totalSum: number;
    readonly isEmpty: boolean;
}

function selectCartItemId(item: CartItemModel): string {
    return item.product.id;
}

export const adapter: EntityAdapter<CartItemModel> = createEntityAdapter<CartItemModel>({
    selectId: selectCartItemId
});

export const initialCartState: CartState = adapter.getInitialState({
    totalQuantity: 0,
    totalSum: 0,
    isEmpty: true
});
