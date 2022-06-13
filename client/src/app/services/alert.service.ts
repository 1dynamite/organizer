import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(style: string, message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      panelClass: [style],
      data: { message: message },
    });
  }

  openErrorMessage(message: string) {
    this.openSnackBar('error-snackbar', message);
  }

  openInfoMessage(message: string) {
    this.openSnackBar('info-snackbar', message);
  }

  openSuccessMessage(message: string) {
    this.openSnackBar('success-snackbar', message);
  }
}
