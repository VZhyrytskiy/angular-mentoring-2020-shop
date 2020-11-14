import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  private readonly chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  generate(n: number): string {
    const values = [];

    for (let i = 0; i < n; ++i) {
      const randomIndex = Math.floor(Math.random() * this.chars.length);
      values.push(this.chars.charAt(randomIndex));
    }

    return values.join('');
  }
}
