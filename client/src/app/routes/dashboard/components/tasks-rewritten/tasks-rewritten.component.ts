import { TasksRewrittenService } from './services/tasks-rewritten.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks-rewritten',
  templateUrl: './tasks-rewritten.component.html',
  styleUrls: ['./tasks-rewritten.component.scss'],
})
export class TasksRewrittenComponent implements OnInit {
  selectedIndex = 0;
  @Input() baseUrl = '';
  pageNumber = 1;

  queryParamsSubscription!: Subscription;
  tasksAllSubscription!: Subscription;

  constructor(
    public dialog: MatDialog,
    public tasksService: TasksRewrittenService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParamMap.subscribe(
      (value) => {
        const status = value.get('status');

        if (status === 'completed') this.selectedIndex = 1;
        else this.selectedIndex = 0;

        this.tasksService.getTasks(value, this.baseUrl, this.pageNumber);
      }
    );

    this.tasksAllSubscription = this.tasksService.tasksAll.subscribe(
      (value) => {
        const repeatedValues = value.filter(
          (element: any) => element.repeated === true
        );

        this.tasksService.tasksGroupedByDay =
          this.tasksService.groupTasksByDay(repeatedValues);

        this.tasksService.commonTasks = this.tasksService.tasksAll.value.filter(
          (element: any) => element.repeated === false
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.tasksService.tasksAll.next([]);
    this.queryParamsSubscription.unsubscribe();
    this.tasksAllSubscription.unsubscribe();
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

  scrollEvent(event: any) {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.tasksService.getTasks(
        this.activatedRoute.snapshot.paramMap,
        this.baseUrl,
        ++this.pageNumber
      );
    }
  }

  addItem(itemData: any) {
    this.tasksService.addTask(itemData, this.baseUrl).subscribe({
      next: (res: any) => {
        this.alertService.success('Successfully added!');
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.error(err.error.message);
      },
    });
  }

  onEditItem(_id: string, myData: any) {
    this.tasksService.updateTask(_id, myData, this.baseUrl).subscribe({
      next: (res: any) => {
        this.alertService.success('Successfully edited!');
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.error(err.error.message);
      },
    });
  }

  onDeleteItem(_id: string) {
    this.tasksService.deleteTask(_id, this.baseUrl).subscribe({
      next: (res: any) => {
        this.alertService.success('Successfully deleted!');
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.error(err.error.message);
      },
    });
  }

  onCompleteTask(_id: string) {
    this.tasksService.completeTask(_id, this.baseUrl).subscribe({
      next: (res) => {},
      error: (err) => {},
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === undefined) return;

      this.addItem(result);
    });
  }

  drop(event: CdkDragDrop<any[]>, groupArray: any[]) {
    this.tasksService.reOrder(event, groupArray, this.baseUrl);
  }
}
