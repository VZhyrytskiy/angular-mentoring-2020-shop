import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { ThemeService } from '../../services/theme.service';
import { UsersService } from './../../services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    public readonly dialogRef: MatDialogRef<LoginComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly usersService: UsersService,
    private readonly themeService: ThemeService
  ) { }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      const controls = this.loginForm.controls;
      Object.keys(controls)
        .forEach(name => controls[name].markAsTouched());
      return;
    }

    this.usersService.login(this.loginForm.value.username)
      .subscribe(user => {
        this.themeService.restore(user.username);
        this.dialogRef.close();
      });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }
}


