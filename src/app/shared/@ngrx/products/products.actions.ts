import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/products/models/product.model';

export const getProductItems = createAction(
    '[Product Page] GET_PRODUCT_ITEMS'
);

export const getProductItemsSuccess = createAction(
    '[Get Product Items Effect] GET_PRODUCT_ITEMS_SUCCESS',
    props<{ products: ReadonlyArray<ProductModel> }>()
);

