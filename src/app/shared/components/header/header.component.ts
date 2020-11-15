import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartService } from 'src/app/cart/services/cart.service';
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

  public userName: Observable<string>;
  public isLoggedIn: Observable<boolean>;
  public isAdmin: Observable<boolean>;
  public totalQuantity: Observable<number>;

  constructor(@Inject(AppConfig) private readonly appConfig: AppConfig,
              public loginDialog: MatDialog,
              private readonly usersService: UsersService,
              private readonly cartService: CartService,
              private readonly router: Router) { }

  onLoginClick(): void {
    this.loginDialog.open(LoginComponent);
  }

  onLogoutClick(): void {
    this.usersService.logout().subscribe(() =>
      this.router.navigateByUrl(''));
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
