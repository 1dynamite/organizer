import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  title = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<AddTaskComponent>) {}

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close();
  }

  onClickSave() {
    this.dialogRef.close({
      title: this.title.value,
    });
  }

  getErrorMessage() {
    if (this.title.hasError('required'))
      return 'Required field should not be empty';
    return '';
  }
}
