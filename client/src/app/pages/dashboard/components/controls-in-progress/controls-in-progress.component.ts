import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from 'src/app/pages/dialogs/add-task/add-task.component';
import { AddTask } from '../../models/models.tasks';

@Component({
  selector: 'app-controls-in-progress',
  templateUrl: './controls-in-progress.component.html',
  styleUrls: ['./controls-in-progress.component.scss'],
})
export class ControlsInProgressComponent implements OnInit {
  @Output() addTaskEvent = new EventEmitter<AddTask>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent);

    dialogRef.afterClosed().subscribe((result: AddTask | undefined) => {
      if (result === undefined) return;

      this.addTaskEvent.emit(result);
    });
  }
}
