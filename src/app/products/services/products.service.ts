import { Category } from '../category.enum';
import { ProductModel } from '../models/product.model';

export class ProductsService {
    private products: ProductModel[] = [{
        name: 'Mi Notebook 15.6',
        description: '15.6-inch screen, 1920x1080 pixel display. Full-size keyboard. CPU: Intel Core i5-10210U or i7-10510U processor, Quad core up to 4.2GHz-4.9GHz.',
        price: 1500,
        category: Category.Notebook,
        isAvailable: true,
        rates: [4, 5, 4.5]
    }];

    getProducts(): ProductModel[] {
        return this.products;
    }
}