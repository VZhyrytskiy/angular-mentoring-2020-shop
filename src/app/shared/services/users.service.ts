import { Injectable } from '@angular/core';

import { UserModel } from '../models/user.model';
import { LocalStorageService } from './local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly userKey = 'user';

  constructor(private readonly localStorageService: LocalStorageService) { }

  login(username: string): UserModel {
    const roles = ['user'];

    if (username === 'admin') {
      roles.push('admin');
    }

    const user = new UserModel(username, roles);

    this.localStorageService.setItem<UserModel>(this.userKey, user);

    return user;
  }

  loadFromLocal(): UserModel {
    return this.localStorageService.getItem<UserModel>(this.userKey);
  }

  logout(): void {
    return this.localStorageService.removeItem(this.userKey);
  }
}
