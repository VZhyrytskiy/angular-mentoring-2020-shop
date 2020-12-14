import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/products/models/product.model';

export const getProductItems = createAction(
    '[Product] GET_PRODUCT_ITEMS'
);

export const getProductItem = createAction(
    '[Product] GET_PRODUCT_ITEM',
    props<{ id: string }>()
);

export const getProductItemSuccess = createAction(
    '[Product] GET_PRODUCT_ITEM_SUCCESS',
    props<{ product: ProductModel }>()
);

export const getProductItemsSuccess = createAction(
    '[Get Product Items Effect] GET_PRODUCT_ITEMS_SUCCESS',
    props<{ products: ReadonlyArray<ProductModel> }>()
);
