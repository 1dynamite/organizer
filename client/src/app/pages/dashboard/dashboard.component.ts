import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddTask, EditTask, Task } from './models/models.tasks';
import { TasksService } from './services/tasks.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  tasksCompleted: Task[] = [];
  tasksInProgress: Task[] = [];

  subscriptionTasksMany: Subscription;

  constructor(
    public tasksService: TasksService,
    private _snackBar: MatSnackBar
  ) {
    this.subscriptionTasksMany = this.tasksService.tasksList.subscribe((e) => {
      this.tasksCompleted = this.tasksService.filterSort('completed');
      this.tasksInProgress = this.tasksService.filterSort('in-progress');
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
        this.openSnackBar('error-snackbar', err.error.message);
      },
    };

    this.tasksService.readTasksMany().subscribe(myObserver);
  }

  addTaskEvent(myData: AddTask) {
    const myObserver = {
      next: (res: Task) => {
        this.openSnackBar('success-snackbar', 'Task successfully created!');
      },
      error: (err: HttpErrorResponse) => {
        this.openSnackBar('error-snackbar', err.error.message);
      },
    };

    this.tasksService.createTask(myData).subscribe(myObserver);
  }

  deleteTaskEvent(_id: string) {
    const myObserver = {
      next: (res: { _id: string }) => {
        this.openSnackBar('success-snackbar', 'Task successfully deleted!');
      },
      error: (err: HttpErrorResponse) => {
        this.openSnackBar('error-snackbar', err.error.message);
      },
    };

    this.tasksService.deleteTask(_id).subscribe(myObserver);
  }

  editTaskEvent(_id: string, myData: EditTask) {
    const myObserver = {
      next: (res: Task) => {
        this.openSnackBar('success-snackbar', 'Task successfully edited!');
      },
      error: (err: HttpErrorResponse) => {
        this.openSnackBar('error-snackbar', err.error.message);
      },
    };

    this.tasksService.updateTask(_id, myData).subscribe(myObserver);
  }

  completeTaskEvent(_id: string) {
    const myObserver = {
      error: (err: HttpErrorResponse) => {
        this.openSnackBar('error-snackbar', err.error.message);
      },
    };

    this.tasksService.completeTask(_id).subscribe(myObserver);
  }

  openSnackBar(style: string, message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      panelClass: [style],
      data: { message: message },
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    const oldTasksOrdering = this.tasksInProgress.map((task) => ({
      _id: task._id,
      priorityIndex: task.priorityIndex,
    }));

    moveItemInArray(
      this.tasksInProgress,
      event.previousIndex,
      event.currentIndex
    );

    const newTasksOrdering = this.tasksInProgress;

    oldTasksOrdering.forEach((task, index) => {
      newTasksOrdering[index].priorityIndex = task.priorityIndex;

      this.tasksService
        .updateTask(newTasksOrdering[index]._id, {
          priorityIndex: task.priorityIndex,
        })
        .subscribe();
    });
  }
}
