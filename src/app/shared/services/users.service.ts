import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { UserModel } from '../models/user.model';
import { LocalStorageService } from './local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly userKey = 'user';

  constructor(private readonly localStorageService: LocalStorageService) { }

  login(username: string): Observable<UserModel> {
    const roles = ['user'];

    if (username === 'admin') {
      roles.push('admin');
    }

    const user = new UserModel(username, roles);

    this.localStorageService.setItem<UserModel>(this.userKey, user);

    return of(user);
  }

  loadFromLocal(): Observable<UserModel> {
    return of(this.localStorageService.getItem<UserModel>(this.userKey));
  }

  logout(): Observable<void> {
    return of(this.localStorageService.removeItem(this.userKey));
  }
}
