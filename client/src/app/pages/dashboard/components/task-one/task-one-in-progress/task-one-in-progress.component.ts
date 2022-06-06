import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EditTask, Task } from '../../../models/models.tasks';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from 'src/app/pages/dialogs/edit-task/edit-task.component';
import { DeleteTaskComponent } from 'src/app/pages/dialogs/delete-task/delete-task.component';

@Component({
  selector: 'app-task-one-in-progress',
  templateUrl: './task-one-in-progress.component.html',
  styleUrls: ['./task-one-in-progress.component.scss'],
})
export class TaskOneInProgressComponent implements OnInit {
  @Input() taskOne!: Task;

  @Output() completeTaskEvent = new EventEmitter<undefined>();
  @Output() editTaskEvent = new EventEmitter<EditTask>();
  @Output() deleteTaskEvent = new EventEmitter<void>();

  checked = new FormControl(false);

  constructor(public dialog: MatDialog) {
    this.checked.valueChanges.subscribe((value) => {
      if (value)
        setTimeout(() => {
          this.completeTaskEvent.emit();
        }, 300);
    });
  }

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
