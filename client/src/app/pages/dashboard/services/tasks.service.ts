import { Injectable } from '@angular/core';
import { AddTask, EditTask, ErrorType, Task } from '../models/models.tasks';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasksList = new BehaviorSubject<Task[] | null>(null);

  constructor(private httpClient: HttpClient) {}

  readTasksMany(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('http://localhost:3000/api/tasks');
  }

  createTask(myData: AddTask): Observable<Task> {
    return this.httpClient
      .post<Task>('http://localhost:3000/api/tasks', myData)
      .pipe(
        tap((res) => {
          if (this.tasksList.value === null) return res;

          const myTasks = [res, ...this.tasksList.value];

          this.tasksList.next(myTasks);

          return res;
        })
      );
  }

  deleteTask(_id: string): Observable<{ _id: string }> {
    return this.httpClient
      .delete<{ _id: string }>(`http://localhost:3000/api/tasks/${_id}`)
      .pipe(
        tap((res) => {
          if (this.tasksList.value === null) return res;

          const newValue = this.tasksList.value.filter(
            (element) => element._id !== res._id
          );

          this.tasksList.next(newValue);

          return res;
        })
      );
  }

  updateTask(_id: string, myData: EditTask): Observable<Task> {
    return this.httpClient
      .patch<Task>(`http://localhost:3000/api/tasks/${_id}`, myData)
      .pipe(
        tap((res) => {
          if (this.tasksList.value === null) return res;

          const myIndex = this.tasksList.value.findIndex(
            (element) => element._id === res._id
          );

          if (myIndex === -1) return;

          const element = this.tasksList.value[myIndex];

          this.tasksList.value[myIndex] = { ...element, ...myData };

          this.tasksList.next([...this.tasksList.value]);

          return res;
        })
      );
  }

  completeTask(_id: string): Observable<Task> {
    const myData = {
      status: 'completed',
      completed: new Date(),
    };

    return this.httpClient
      .patch<Task>(`http://localhost:3000/api/tasks/${_id}`, myData)
      .pipe(
        tap((res) => {
          const currentValue = this.tasksList.value;

          if (currentValue === null) return res;

          const myElement = currentValue.find(
            (element) => element._id === res._id
          );

          if (myElement === undefined) return res;

          myElement.status = 'completed';
          myElement.completed = res.completed;

          this.tasksList.next([...currentValue]);

          return res;
        })
      );
  }

  filterSort(myFilter: string): Task[] {
    if (this.tasksList.value === null) return [];

    const filteredTasks = this.tasksList.value.filter(
      (element) => element.status === myFilter
    );

    return filteredTasks.sort((a, b) => b.priorityIndex - a.priorityIndex);
  }
}
