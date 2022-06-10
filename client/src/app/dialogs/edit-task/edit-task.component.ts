import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  title = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {
    this.title.setValue(this.data.title);
  }

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
