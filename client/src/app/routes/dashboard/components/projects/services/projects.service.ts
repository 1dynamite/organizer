import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { TodoService } from '../../todo/services/todo.service';
import { environment } from 'src/environments/environment';
import { forkJoin, Observable, tap } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Injectable()
export class ProjectsService {
  progressValue = 0;
  projectsUrl = `${environment.baseUrl}users/${localStorage.getItem(
    'userId'
  )}/projects/`;

  constructor(
    public todoService: TodoService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.todoService.items = [];
    this.httpClient.get<any>(this.projectsUrl).subscribe((res) => {
      this.todoService.items = res;
    });
  }

  addProject(myData: any): Observable<any> {
    return this.httpClient.post<any>(this.projectsUrl, myData).pipe(
      tap((res) => {
        this.todoService.addItem(res);

        return res;
      })
    );
  }

  deleteProject(_id: string): Observable<{ _id: string }> {
    return this.httpClient
      .delete<{ _id: string }>(`${this.projectsUrl}${_id}`)
      .pipe(
        tap((res) => {
          this.todoService.deleteItem(_id);

          return res;
        })
      );
  }

  updateProject(_id: string, myData: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.projectsUrl}${_id}`, myData).pipe(
      tap((res) => {
        this.todoService.updateItem(_id, myData);

        return res;
      })
    );
  }

  updateManyProjects(myArray: any[]) {
    const myObservables = myArray.map((element) => {
      return this.httpClient.patch<any>(
        `${this.projectsUrl}${element._id}`,
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

    this.updateManyProjects(myArray).subscribe();
  }
}
