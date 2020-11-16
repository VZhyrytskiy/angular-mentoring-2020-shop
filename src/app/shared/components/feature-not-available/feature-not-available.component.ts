import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-feature-not-available',
  templateUrl: './feature-not-available.component.html',
  styleUrls: ['./feature-not-available.component.scss']
})
export class FeatureNotAvailableComponent implements OnInit {

  constructor(private readonly dialog: MatDialog,
              private readonly location: Location) { }

  ngOnInit(): void {
    this.dialog.afterOpened.subscribe(dialogRef =>
      setTimeout(() => this.onDialogOpened(dialogRef), 3000));

    this.dialog.open(FeatureNotAvailableDialogComponent, { disableClose: true });
  }

  private onDialogOpened(dialogRef: MatDialogRef<FeatureNotAvailableDialogComponent, unknown>): void {
    dialogRef.close();
    this.location.back();
  }
}

@Component({
  template: `<div><b>Unfortunately, this feature is not available</b></div><div>Redirecting to previous page...</div>`
})
class FeatureNotAvailableDialogComponent { }
