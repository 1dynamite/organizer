import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UpdateDialogComponent } from '../dialogs/update-dialog/update-dialog.component';
import { AddTaskInterface, EditTaskInterface } from './models/tasks.models';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [TasksService],
})
export class TasksComponent implements OnInit, OnDestroy {
  completed: boolean = false;

  constructor(
    public tasksService: TasksService,
    public dialog: MatDialog,
    public alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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

  onTabChange(index: number) {
    if (index === 0)
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          status: 'in-progress',
        },
        queryParamsHandling: 'merge',
      });
    else {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          status: 'completed',
        },
        queryParamsHandling: 'merge',
      });
    }
  }
}
