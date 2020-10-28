import { Category } from '../category.enum';

export interface ProductModel {
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    category: Category;
    isAvailable: boolean;
    rates: number[];
}
