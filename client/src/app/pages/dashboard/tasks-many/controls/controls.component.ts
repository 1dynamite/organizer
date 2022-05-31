import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../dialogs/add-task/add-task.component';
import Task from '../task-one/task.model';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit {
  @Output() addTaskEvent = new EventEmitter<Task>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent);

    dialogRef.afterClosed().subscribe((result: Task) => {
      this.addTaskEvent.emit(result);
    });
  }
}
