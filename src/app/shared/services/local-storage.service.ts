import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
    useClass: LocalStorageService
})
export class LocalStorageService {

    private readonly localStorage: Storage = window.localStorage;

    setItem<T>(key: string, value: T): void {
        this.localStorage.setItem(key, JSON.stringify(value));
    }

    getItem<T>(key: string): T {
        const value = this.localStorage.getItem(key);

        return JSON.parse(value) as T;
    }

    removeItem(key: string): void {
        this.localStorage.removeItem(key);
    }
}
