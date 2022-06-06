import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskComponent } from 'src/app/pages/dialogs/delete-task/delete-task.component';
import { EditTaskComponent } from 'src/app/pages/dialogs/edit-task/edit-task.component';
import { EditTask, Task } from '../../../models/models.tasks';

@Component({
  selector: 'app-task-one-completed',
  templateUrl: './task-one-completed.component.html',
  styleUrls: ['./task-one-completed.component.scss'],
})
export class TaskOneCompletedComponent implements OnInit {
  @Input() taskOne!: Task;

  @Output() editTaskEvent = new EventEmitter<EditTask>();
  @Output() deleteTaskEvent = new EventEmitter<void>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onEditClick() {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: { title: this.taskOne.title },
    });

    dialogRef.afterClosed().subscribe((result: EditTask | undefined) => {
      if (result === undefined) return;

      this.editTaskEvent.emit(result);
    });
  }

  onDeleteClick() {
    const dialogRef = this.dialog.open(DeleteTaskComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return;

      this.deleteTaskEvent.emit();
    });
  }
}
