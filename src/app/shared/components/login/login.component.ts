import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<LoginComponent>,
              private usersService: UsersService) { }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      const controls = this.loginForm.controls;
      Object.keys(controls)
        .forEach(name => controls[name].markAsTouched());
      return;
    }

    this.usersService.login(this.loginForm.value.username)
      .subscribe(() => this.dialogRef.close());
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }
}


