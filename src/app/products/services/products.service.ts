import { Injectable } from '@angular/core';
import { Category } from '../category.enum';
import { ProductModel } from '../models/product.model';

// Это надо для регистрации сервиса, еще будем проходить
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    private products: ProductModel[] = [{
        name: 'Mi Notebook 15.6',
        imageUrl: 'https://amazingame.ru/upload/iblock/0eb/0eb2b37ea08a9080ee9ec38134edee6f.jpg',
        description: '15.6-inch screen, 1920x1080 pixel display. Full-size keyboard. CPU: Intel Core i5-10210U or i7-10510U processor, Quad core up to 4.2GHz-4.9GHz.',
        price: 1500,
        category: Category.Notebook,
        isAvailable: true,
        rates: [4, 5, 4.5]
    },
    {
        name: 'iPhone 12 Pro Max',
        imageUrl: 'https://www.gizmochina.com/wp-content/uploads/2019/09/Apple-iPhone-11-Pro-Max-1-500x500.jpg',
        description: 'Apple iPhone 12 Pro Max smartphone runs on iOS v13.0 operating system. The phone is powered by Hexa Core (2.65 GHz, Dual core, Lightning + 1.8 GHz, Quad core, Thunder) processor. It runs on the Apple A13 Bionic Chipset. It has 6 GB RAM and 64 GB internal storage.',
        price: 2000,
        category: Category.MobilePhone,
        isAvailable: false,
        rates: [5, 1, 3, 4, 6]
    }];

    getProducts(): ProductModel[] {
        return this.products;
    }
}
