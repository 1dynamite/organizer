import { Injectable } from '@angular/core';
import { AddTask, EditTasksMany, EditTask, Task } from '../models/models.tasks';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasksList = new BehaviorSubject<Task[] | null>(null);
  tasksCompleted: Task[] = [];
  tasksInProgress: Task[] = [];

  constructor(private httpClient: HttpClient) {}

  getTasksMany(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${baseUrl}tasks`);
  }

  createTask(myData: AddTask): Observable<Task> {
    return this.httpClient.post<Task>(`${baseUrl}tasks`, myData).pipe(
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
      .delete<{ _id: string }>(`${baseUrl}tasks/${_id}`)
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
    return this.httpClient.patch<Task>(`${baseUrl}tasks/${_id}`, myData).pipe(
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

  updateTasksMany(myArray: EditTasksMany[]) {
    const myObservables = myArray.map((element) => {
      return this.httpClient.patch<Task>(
        `${baseUrl}tasks/${element._id}`,
        element.myData
      );
    });

    return forkJoin(myObservables).pipe(
      tap((res: Task[]) => {
        res.forEach((task, index) => {
          this.tasksInProgress[index].priorityIndex = task.priorityIndex;
        });
      })
    );
  }

  reOrderTasks(event: CdkDragDrop<Task[]>) {
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

    const myArray: EditTasksMany[] = oldTasksOrdering.map((task, index) => ({
      _id: newTasksOrdering[index]._id,
      myData: {
        priorityIndex: task.priorityIndex,
      },
    }));

    this.updateTasksMany(myArray).subscribe();
  }

  completeTask(_id: string): Observable<Task> {
    const myData = {
      status: 'completed',
      completed: new Date(),
    };

    return this.httpClient.patch<Task>(`${baseUrl}tasks/${_id}`, myData).pipe(
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

    if (myFilter === 'completed') {
      return filteredTasks.sort(
        (a, b) =>
          new Date(b.completed!).getTime() - new Date(a.completed!).getTime()
      );
    }

    return filteredTasks.sort((a, b) => b.priorityIndex - a.priorityIndex);
  }
}
