import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CartService } from 'src/app/cart/services/cart.service';
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

  constructor(
    public readonly themeService: ThemeService,
    public readonly cartService: CartService,
    @Inject(AppConfig) private readonly appConfig: AppConfig,
    private readonly loginDialog: MatDialog,
    private readonly usersService: UsersService,
    private readonly router: Router) { }

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
  }

  ngAfterViewInit(): void {
    this.titleRef.nativeElement.textContent = this.appConfig.title;
  }
}
