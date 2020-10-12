import { Category } from '../category.enum';

export class ProductModel {
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    category: Category;
    isAvailable: boolean;
    rates: number[];
}
