import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {
  title = new FormControl('', Validators.required);
  interval = new FormControl(1, Validators.required);
  startDate = new FormControl(new Date(), Validators.required);
  iterations = new FormControl(1, Validators.required);
  repeated = new FormControl(false);

  minDate = new Date();

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>) {}

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close();
  }

  onClickSave() {
    this.dialogRef.close({
      title: this.title.value,
      startDate: this.startDate.value,
      interval: this.interval.value,
      iterations: this.iterations.value,
      repeated: this.repeated.value,
    });
  }

  getErrorMessage() {
    if (this.title.hasError('required'))
      return 'Required field should not be empty';
    return '';
  }
}
