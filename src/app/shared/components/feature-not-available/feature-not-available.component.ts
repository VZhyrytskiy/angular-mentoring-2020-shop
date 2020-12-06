import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { back } from '../../@ngrx/router/router.actions';

@Component({
  selector: 'app-feature-not-available',
  templateUrl: './feature-not-available.component.html',
  styleUrls: ['./feature-not-available.component.scss']
})
export class FeatureNotAvailableComponent implements OnInit {

  constructor(private dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
    this.dialog.afterOpened.subscribe(dialogRef =>
      setTimeout(() => this.onDialogOpened(dialogRef), 3000));

    this.dialog.open(FeatureNotAvailableDialogComponent, { disableClose: true });
  }

  private onDialogOpened(dialogRef: MatDialogRef<Component, unknown>): void {
    dialogRef.close();
    this.store.dispatch(back());
  }
}

@Component({
  template: `
  <div>
    <b>Unfortunately, this feature is not available</b>
  </div>
  <div>Redirecting to previous page...</div>`
})
class FeatureNotAvailableDialogComponent { }
