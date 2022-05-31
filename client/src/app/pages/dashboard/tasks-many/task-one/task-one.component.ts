import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Task from './task.model';
import { DeleteTaskComponent } from '../dialogs/delete-task/delete-task.component';
import { EditTaskComponent } from '../dialogs/edit-task/edit-task.component';

interface EditEventData {
  index: number;
  data: Task;
}

@Component({
  selector: 'app-task-one',
  templateUrl: './task-one.component.html',
  styleUrls: ['./task-one.component.scss'],
})
export class TaskOneComponent implements OnInit {
  rippleDisabled = false;
  @Input() taskOne!: Task;
  @Input() index!: number;

  @Output() deleteEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<EditEventData>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onRootClick() {
    console.log('root click');
  }

  onEditClick(e: Event) {
    e.stopPropagation();

    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: this.taskOne,
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      const myData: EditEventData = {
        index: this.index,
        data: result,
      };

      if (result) this.editEvent.emit(myData);
    });
  }

  onEditMouseOver() {
    this.rippleDisabled = true;
  }

  onEditMouseOut() {
    this.rippleDisabled = false;
  }

  onDeleteClick(e: Event) {
    e.stopPropagation();

    const dialogRef = this.dialog.open(DeleteTaskComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) this.deleteEvent.emit(this.index);
    });
  }

  onDeleteMouseOver() {
    this.rippleDisabled = true;
  }

  onDeleteMouseOut() {
    this.rippleDisabled = false;
  }
}
