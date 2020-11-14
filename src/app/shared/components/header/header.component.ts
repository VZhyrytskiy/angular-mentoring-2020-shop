import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, observable, Observable } from 'rxjs';
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
  public cartItemsCount: Observable<number>;

  constructor(@Inject(AppConfig) private readonly appConfig: AppConfig,
              public loginDialog: MatDialog,
              private readonly usersService: UsersService,
              private readonly cartService: CartService) { }

  onLoginClick(): void {
    this.loginDialog.open(LoginComponent);
  }

  ngOnInit(): void {
    this.userName = this.usersService.getCurrentUser().pipe(map(x => x?.username));
    this.isLoggedIn = this.usersService.getCurrentUser().pipe(map(x => x !== null && x !== undefined));
    this.cartItemsCount = new BehaviorSubject(this.cartService.totalQuantity).asObservable();
  }

  ngAfterViewInit(): void {
    this.titleRef.nativeElement.textContent = this.appConfig.title;
  }
}
