import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UpdateDialogComponent } from 'src/app/components/dialogs/update-dialog/update-dialog.component';
import { AddTaskInterface, EditTaskInterface } from '../../models/tasks.models';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-by-status',
  templateUrl: './task-by-status.component.html',
  styleUrls: ['./task-by-status.component.scss'],
})
export class TaskByStatusComponent implements OnInit {
  @Input() completed!: boolean;
  @Input() tasksService!: TasksService;

  constructor(
    public dialog: MatDialog,
    public alertService: AlertService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: { title: '', dialogTitle: 'Add task' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === undefined) return;

      this.addTaskEvent(result);
    });
  }

  addTaskEvent(myData: AddTaskInterface) {
    const myObserver = {
      next: (res: any) => {
        this.alertService.success('Successfully added!');
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.error(err.error.message);
      },
    };

    const projectId = this.activatedRoute.snapshot.paramMap.get('projectId');
    if (projectId) myData.projectId = projectId;

    this.tasksService.addTask(myData).subscribe(myObserver);
  }

  editTaskEvent(_id: string, myData: EditTaskInterface) {
    const myObserver = {
      next: (res: any) => {
        this.alertService.success('Successfully edited!');
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.error(err.error.message);
      },
    };

    this.tasksService.updateTask(_id, myData).subscribe(myObserver);
  }

  deleteTaskEvent(_id: string) {
    const myObserver = {
      next: (res: { _id: string }) => {
        this.alertService.success('Successfully deleted!');
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.error(err.error.message);
      },
    };

    this.tasksService.deleteTask(_id).subscribe(myObserver);
  }

  completeTaskEvent(_id: string) {
    const myObserver = {
      error: (err: HttpErrorResponse) => {
        this.alertService.error(err.error.message);
      },
    };

    this.tasksService.completeTask(_id).subscribe(myObserver);
  }

  drop(event: CdkDragDrop<any[]>) {
    this.tasksService.reOrder(event);
  }
}
