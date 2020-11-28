import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartService } from 'src/app/cart/services/cart.service';
import { AppSettingsModel } from '../../models/app-settings.model';
import { AppSettingsService } from '../../services/app-settings.service';
import { LoginComponent } from '../login/login.component';
import { AppConfig, ConstantsService, UsersService } from './../../services/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    {
      provide: AppConfig,
      useValue: ConstantsService
    }
  ]
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('appTitle') titleRef: ElementRef<HTMLHeadingElement>;

  userName: Observable<string>;
  isLoggedIn: Observable<boolean>;
  isAdmin: Observable<boolean>;
  totalQuantity: Observable<number>;
  isDarkTheme: Observable<boolean>;

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfig,
    private loginDialog: MatDialog,
    private readonly usersService: UsersService,
    private readonly cartService: CartService,
    private readonly router: Router,
    private readonly settings: AppSettingsService) { }

  onLoginClick(): void {
    this.loginDialog.open(LoginComponent);
  }

  onLogoutClick(): void {
    this.usersService.logout().subscribe(() =>
      this.router.navigateByUrl(''));
  }

  onChange(event: MatSlideToggleChange): void {
    this.settings.setIsDarkTheme(event.checked);
  }

  ngOnInit(): void {
    const currentUser = this.usersService.getCurrentUser();

    this.userName = currentUser.pipe(map(user => {
      return user?.username;
    }));

    this.isLoggedIn = currentUser.pipe(map(user => {
      return user !== null && user !== undefined;
    }));

    this.isAdmin = this.usersService.isCurrentUserInRole('admin');
    this.totalQuantity = this.cartService.totalQuantity();

  }

  ngAfterViewInit(): void {
    this.titleRef.nativeElement.textContent = this.appConfig.title;
  }
}
