import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from 'src/app/components/dialogs/add-task/add-task.component';
import { AddTask } from '../../models/models.tasks';

@Component({
  selector: 'app-tasks-panel',
  templateUrl: './tasks-panel.component.html',
  styleUrls: ['./tasks-panel.component.scss'],
})
export class TasksPanelComponent implements OnInit {
  @Input() completed: boolean = false;
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
