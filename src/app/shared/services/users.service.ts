import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserModel } from '../models/user.model';
import { LocalStorageService } from './local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly userKey = 'user';
  private readonly user: BehaviorSubject<UserModel>;
  user$: Observable<UserModel>;

  constructor(private readonly localStorageService: LocalStorageService) {
    this.user = new BehaviorSubject<UserModel>(this.localStorageService.getItem(this.userKey));
    this.user$ = this.user.asObservable();
  }

  login(username: string): Observable<UserModel> {
    const roles = ['user'];

    if (username === 'admin') {
      roles.push('admin');
    }

    const user = new UserModel(username, roles);

    this.localStorageService.setItem<UserModel>(this.userKey, user);

    this.user.next(user);

    return of(user);
  }

  logout(): Observable<void> {
    this.localStorageService.removeItem(this.userKey);
    this.user.next(null);
    return of();
  }

  getCurrentUser(): UserModel {
    return this.user.getValue();
  }

  isCurrentUserInRole(role: string): Observable<boolean> {
    return this.user$.pipe(map(user => user?.roles.some(userRole => userRole === role)));
  }
}
