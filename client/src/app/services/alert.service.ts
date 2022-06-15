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

  error(message: string) {
    this.openSnackBar('error-snackbar', message);
  }

  info(message: string) {
    this.openSnackBar('info-snackbar', message);
  }

  success(message: string) {
    this.openSnackBar('success-snackbar', message);
  }
}
