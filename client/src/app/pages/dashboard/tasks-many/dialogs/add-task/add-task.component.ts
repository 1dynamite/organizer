import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  title = new FormControl('');
  statusControl = new FormControl('in-progress');

  constructor(public dialogRef: MatDialogRef<AddTaskComponent>) {}

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
