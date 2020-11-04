import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  private readonly chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  generate(n: number): string {
    let values = [];

    for (let i = 0; i < n; ++i) {
      const index = Math.floor(Math.random() * this.chars.length);
      values.push(this.chars.charAt(index));
    }

    return values.join('');
  }
}