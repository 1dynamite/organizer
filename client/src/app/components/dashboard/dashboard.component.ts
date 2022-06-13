import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddTask, EditTask, Task } from './models/models.tasks';
import { TasksService } from './services/tasks.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscriptionTasksMany: Subscription;

  constructor(
    public tasksService: TasksService,
    private alertService: AlertService
  ) {
    this.subscriptionTasksMany = this.tasksService.tasksList.subscribe((e) => {
      this.tasksService.tasksCompleted =
        this.tasksService.filterSort('completed');
      this.tasksService.tasksInProgress =
        this.tasksService.filterSort('in-progress');
    });
  }

  ngOnDestroy(): void {
    this.subscriptionTasksMany.unsubscribe();
  }

  ngOnInit(): void {
    const myObserver = {
      next: (res: Task[]) => {
        this.tasksService.tasksList.next(res);
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.openErrorMessage(err.error.message);
      },
    };

    this.tasksService.getTasksMany().subscribe(myObserver);
  }

  addTaskEvent(myData: AddTask) {
    const myObserver = {
      next: (res: Task) => {
        this.alertService.openSuccessMessage('Task successfully created!');
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.openErrorMessage(err.error.message);
      },
    };

    this.tasksService.createTask(myData).subscribe(myObserver);
  }

  deleteTaskEvent(_id: string) {
    const myObserver = {
      next: (res: { _id: string }) => {
        this.alertService.openSuccessMessage('Task successfully deleted!');
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.openErrorMessage(err.error.message);
      },
    };

    this.tasksService.deleteTask(_id).subscribe(myObserver);
  }

  editTaskEvent(_id: string, myData: EditTask) {
    const myObserver = {
      next: (res: Task) => {
        this.alertService.openSuccessMessage('Task successfully edited!');
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.openErrorMessage(err.error.message);
      },
    };

    this.tasksService.updateTask(_id, myData).subscribe(myObserver);
  }

  completeTaskEvent(_id: string) {
    const myObserver = {
      error: (err: HttpErrorResponse) => {
        this.alertService.openErrorMessage(err.error.message);
      },
    };

    this.tasksService.completeTask(_id).subscribe(myObserver);
  }

  drop(event: CdkDragDrop<Task[]>) {
    this.tasksService.reOrderTasks(event);
  }
}