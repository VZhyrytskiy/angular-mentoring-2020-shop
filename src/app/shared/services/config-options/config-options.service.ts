import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {

  private config: object = {};

  get(): object {
    return this.config;
  }

  set(values: object): void {
    this.config = Object.assign(this.config, values);
  }
}
