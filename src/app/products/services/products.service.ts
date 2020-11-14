import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Category } from '../category.enum';
import { ProductModel } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private readonly initialProducts: ProductModel[] =
        [
            {
                id: '1',
                name: 'Mi Notebook 15.6',
                imageUrl: 'https://amazingame.ru/upload/iblock/0eb/0eb2b37ea08a9080ee9ec38134edee6f.jpg',
                description: '15.6-inch screen, 1920x1080 pixel display. Full-size keyboard. CPU: Intel Core i5-10210U or i7-10510U processor, Quad core up to 4.2GHz-4.9GHz.',
                price: 1500,
                category: Category.Notebook,
                isAvailable: true,
                rates: [4, 5, 4.5]
            },
            {
                id: '2',
                name: 'iPhone 12 Pro Max',
                imageUrl: 'https://www.gizmochina.com/wp-content/uploads/2019/09/Apple-iPhone-11-Pro-Max-1-500x500.jpg',
                description: 'Apple iPhone 12 Pro Max smartphone runs on iOS v13.0 operating system. The phone is powered by Hexa Core (2.65 GHz, Dual core, Lightning + 1.8 GHz, Quad core, Thunder) processor. It runs on the Apple A13 Bionic Chipset. It has 6 GB RAM and 64 GB internal storage.',
                price: 2000,
                category: Category.MobilePhone,
                isAvailable: false,
                rates: [5, 1, 3, 4, 6]
            },
            {
                id: '3',
                name: 'Xiaomi Mi Note 10 Lite',
                imageUrl: 'https://www.gizmochina.com/wp-content/uploads/2020/04/Xiaomi-Mi-Note-10-Lite.jpg',
                description: 'Xiaomi Mi Note 10 Lite specifications include a 6.47-inch curved AMOLED display, Snapdragon 730G processor, coupled with 6GB of RAM and up to 128GB of internal storage, and massive 5,260mAh battery. There is a quad-camera setup with a 64MP primary shooter, on the back, while at the front, the device features a 16MP unit inside of a waterdrop-style notch. The Mi Note 10 Lite comes with Android 10 out of the box.',
                price: 1000,
                category: Category.MobilePhone,
                isAvailable: true,
                rates: [5, 2, 3, 4, 3, 2]
            }
        ];

    private readonly products = new BehaviorSubject<ProductModel[]>(this.initialProducts);

    getProducts(): Observable<ProductModel[]> {
        return this.products.asObservable();
    }

    getProductById(id: string): ProductModel | null {
        const products = this.products.getValue();
        const index = products.findIndex(x => x.id === id);

        if (index > -1) {
            return products[index];
        }

        return null;
    }
}
