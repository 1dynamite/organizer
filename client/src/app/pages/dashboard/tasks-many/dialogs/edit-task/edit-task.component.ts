import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Task from '../../task-one/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  title = new FormControl('');
  statusControl = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.title.setValue(this.data.title);
    this.statusControl.setValue(this.data.status);
  }

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close();
  }

  onClickSave() {
    this.dialogRef.close({
      title: this.title.value,
      status: this.statusControl.value,
    });
  }
}
