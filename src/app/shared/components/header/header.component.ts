import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { selectTotalQuantity } from '../../@ngrx';

import { ThemeService } from '../../services/theme.service';
import { LoginComponent } from '../login/login.component';
import { AppConfig, UsersService } from './../../services/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('appTitle') titleRef: ElementRef<HTMLHeadingElement>;

  userName: BehaviorSubject<string> = new BehaviorSubject(null);
  isLoggedIn: Observable<boolean>;
  isAdmin: Observable<boolean>;
  totalQuantity: Observable<number>;

  constructor(
    public themeService: ThemeService,
    public store: Store,
    @Inject(AppConfig) private appConfig: AppConfig,
    private loginDialog: MatDialog,
    private usersService: UsersService,
    private router: Router) { }

  onLoginClick(): void {
    this.loginDialog.open(LoginComponent);
  }

  onLogoutClick(): void {
    this.usersService.logout().subscribe(() => this.router.navigateByUrl(''));
  }

  onChange(event: MatSlideToggleChange): void {
    this.themeService.setIsDarkTheme(this.userName.getValue(), event.checked);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.usersService.user$.pipe(switchMap(user => {
      const isLogged = user !== null && user !== undefined;

      if (isLogged) {
        this.userName.next(user.username);
      }

      return of(isLogged);
    }));

    this.isAdmin = this.usersService.isCurrentUserInRole('admin');
    this.totalQuantity = this.store.pipe(select(selectTotalQuantity));
  }

  ngAfterViewInit(): void {
    this.titleRef.nativeElement.textContent = this.appConfig.title;
  }
}
