import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('appTitle') titleRef: ElementRef<HTMLHeadingElement>;

  userName: BehaviorSubject<string> = new BehaviorSubject(null);
  isLoggedIn: Observable<boolean>;
  isAdmin: Observable<boolean>;
  totalQuantity: Observable<number>;
  settings: Observable<AppSettingsModel>;

  private userNameSub: Subscription;

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfig,
    private readonly loginDialog: MatDialog,
    private readonly usersService: UsersService,
    private readonly cartService: CartService,
    private readonly router: Router,
    private readonly appSettings: AppSettingsService) { }

  onLoginClick(): void {
    this.loginDialog.open(LoginComponent);
  }

  onLogoutClick(): void {
    this.usersService.logout().subscribe(() => {
      this.router.navigateByUrl('');
    });
  }

  onChange(event: MatSlideToggleChange): void {
    this.appSettings.update(this.userName.getValue(), new AppSettingsModel(event.checked));
  }

  ngOnInit(): void {
    const currentUser = this.usersService.user$;

    this.userNameSub = currentUser.subscribe(user => this.userName.next(user?.username));

    this.isLoggedIn = currentUser.pipe(map(user => user !== null && user !== undefined));
    this.isLoggedIn.pipe(filter(isLoggedIn => !isLoggedIn)).subscribe(this.appSettings.reset);
    this.isAdmin = this.usersService.isCurrentUserInRole('admin');
    this.totalQuantity = this.cartService.totalQuantity();
    this.settings = this.appSettings.settings$;
  }

  ngAfterViewInit(): void {
    this.titleRef.nativeElement.textContent = this.appConfig.title;
  }

  ngOnDestroy(): void {
    this.userNameSub.unsubscribe();
  }
}
