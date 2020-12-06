import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { take, tap } from 'rxjs/operators';

import { loginUser, loginUserSuccess } from '../../@ngrx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private store: Store,
    private actions$: Actions
  ) { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(loginUser({ username: this.loginForm.value.username }));
      return;
    }

    const controls = this.loginForm.controls;
    Object.keys(controls).forEach(name => controls[name].markAsTouched());
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required]
    });

    this.actions$.pipe(
      ofType(loginUserSuccess),
      tap(() => this.dialogRef.close()),
      take(1)
    ).subscribe();
  }
}


