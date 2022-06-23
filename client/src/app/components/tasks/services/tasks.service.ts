import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoService } from '../../todo/services/todo.service';
import { environment } from 'src/environments/environment';
import { forkJoin, Observable, tap } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';

const baseUrl = environment.baseUrl;
@Injectable()
export class TasksService {
  constructor(
    public todoService: TodoService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: {
          projectId: this.route.snapshot.paramMap.get('projectId'),
        },
      })
      .then(() => {
        this.route.queryParamMap.subscribe((value) => {
          const status = value.get('status');
          const projectId = value.get('projectId');

          const params = new URLSearchParams();

          if (status) params.append('status', status);
          else params.append('status', 'in-progress');
          if (projectId) params.append('projectId', projectId);

          this.httpClient
            .get<any>(`${baseUrl}tasks?${params.toString()}`)
            .subscribe((res) => {
              this.todoService.items = res;
            });
        });
      });
  }

  addTask(myData: any): Observable<any> {
    return this.httpClient.post<any>(`${baseUrl}tasks`, myData).pipe(
      tap((res) => {
        this.todoService.addItem(res);

        return res;
      })
    );
  }

  deleteTask(_id: string): Observable<{ _id: string }> {
    return this.httpClient
      .delete<{ _id: string }>(`${baseUrl}tasks/${_id}`)
      .pipe(
        tap((res) => {
          this.todoService.deleteItem(_id);

          return res;
        })
      );
  }

  updateTask(_id: string, myData: any): Observable<any> {
    return this.httpClient.patch<any>(`${baseUrl}tasks/${_id}`, myData).pipe(
      tap((res) => {
        this.todoService.updateItem(_id, myData);

        return res;
      })
    );
  }

  updateManyTasks(myArray: any[]) {
    const myObservables = myArray.map((element) => {
      return this.httpClient.patch<any>(
        `${baseUrl}tasks/${element._id}`,
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

    return this.httpClient.patch<any>(`${baseUrl}tasks/${_id}`, myData).pipe(
      tap((res) => {
        this.todoService.completeItem(_id, myData);

        return res;
      })
    );
  }
}
