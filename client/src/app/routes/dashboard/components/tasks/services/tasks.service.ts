import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { TodoService } from '../../todo/services/todo.service';
import { BehaviorSubject, forkJoin, Observable, Subscription, tap } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class TasksService implements OnDestroy {
  baseUrlTasks = new BehaviorSubject<string | undefined>(undefined);

  queryParamsSubscription: Subscription | undefined;

  constructor(
    public todoService: TodoService,
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) {
    this.baseUrlTasks.subscribe((myBaseUrl) => {
      if (myBaseUrl === undefined) return;

      // unsubscribe 'queryParamsSubscription' if baseUrlTasks changes more than twice
      this.queryParamsSubscription = this.route.queryParamMap.subscribe(
        (value) => {
          const status = value.get('status');
          const projectId = value.get('projectId');

          const params = new URLSearchParams();

          if (status) params.append('status', status);
          else params.append('status', 'in-progress');
          if (projectId) params.append('projectId', projectId);

          this.httpClient
            .get<any>(`${myBaseUrl}?${params.toString()}`)
            .subscribe((res) => {
              this.todoService.items = res;
            });
        }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription)
      this.queryParamsSubscription.unsubscribe();
  }

  addTask(myData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlTasks.value}`, myData).pipe(
      tap((res) => {
        this.todoService.addItem(res);

        return res;
      })
    );
  }

  deleteTask(_id: string): Observable<{ _id: string }> {
    return this.httpClient
      .delete<{ _id: string }>(`${this.baseUrlTasks.value}/${_id}`)
      .pipe(
        tap((res) => {
          this.todoService.deleteItem(_id);

          return res;
        })
      );
  }

  updateTask(_id: string, myData: any): Observable<any> {
    return this.httpClient
      .patch<any>(`${this.baseUrlTasks.value}/${_id}`, myData)
      .pipe(
        tap((res) => {
          this.todoService.updateItem(_id, myData);

          return res;
        })
      );
  }

  updateManyTasks(myArray: any[]) {
    const myObservables = myArray.map((element) => {
      return this.httpClient.patch<any>(
        `${this.baseUrlTasks.value}/${element._id}`,
        element.myData
      );
    });

    return forkJoin(myObservables).pipe(
      tap((res: any[]) => {
        this.todoService.updateManyItems(res);

        return res;
      })
    );
  }

  reOrder(event: CdkDragDrop<any[]>) {
    const myArray = this.todoService.reOrder(event);

    this.updateManyTasks(myArray).subscribe();
  }

  completeTask(_id: string): Observable<any> {
    const myData = {
      status: 'completed',
      completed: new Date(),
    };

    return this.httpClient
      .patch<any>(`${this.baseUrlTasks.value}/${_id}`, myData)
      .pipe(
        tap((res) => {
          this.todoService.completeItem(_id, myData);

          return res;
        })
      );
  }
}
