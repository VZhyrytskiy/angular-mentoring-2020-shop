export interface CartListOrderByOption {
    value: string;
    displayValue: string;
}

export interface CartListSortDirectionOption {
    displayValue: string;
    isAscending: boolean;
    isDefault: boolean;
}

export const CartOrderByOptions: CartListOrderByOption[] =
    [
        {
            value: 'product.name',
            displayValue: 'Product name'
        },
        {
            value: 'product.price',
            displayValue: 'Unit price'
        },
        {
            value: 'quantity',
            displayValue: 'Unit quantity'
        }
    ];

export const CartSortDirectionOptions: CartListSortDirectionOption[] = [
    {
        isAscending: true,
        isDefault: true,
        displayValue: 'Ascending'
    },
    {
        isAscending: false,
        isDefault: false,
        displayValue: 'Descending'
    }
];
