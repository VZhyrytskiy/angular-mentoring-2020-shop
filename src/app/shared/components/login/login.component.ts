import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { AppSettingsService } from '../../services/app-settings.service';
import { AppConfig, ConstantsService, UsersService } from './../../services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    {
      provide: AppConfig,
      useValue: ConstantsService
    }
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    public readonly dialogRef: MatDialogRef<LoginComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly usersService: UsersService,
    private readonly appSettings: AppSettingsService,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(AppConfig) private readonly appConfig: AppConfig) { }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      const controls = this.loginForm.controls;
      Object.keys(controls)
        .forEach(name => controls[name].markAsTouched());
      return;
    }

    this.usersService.login(this.loginForm.value.username)
      .subscribe(user => {
        this.appSettings.get(user.username).subscribe(x => {
          const result = (x.isDarkTheme && !this.darkThemeIsSet()) || (!x.isDarkTheme && this.darkThemeIsSet());
          if (result) {
            this.document.body.classList.toggle(this.appConfig.darkThemeClassName);
          }
          this.dialogRef.close();
        });
      });
  }

  private darkThemeIsSet(): boolean {
    return this.document.body.classList.contains(this.appConfig.darkThemeClassName);
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }
}


