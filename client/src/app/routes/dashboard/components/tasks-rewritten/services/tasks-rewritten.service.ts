import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, forkJoin, Observable, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksRewrittenService {
  tasksAll: BehaviorSubject<any> = new BehaviorSubject([]);
  tasksGroupedByDay: any = [];
  commonTasks: any = [];

  constructor(private httpClient: HttpClient) {}

  getTasks(value: any, myBaseUrl: any, pageNumber: number) {
    const status = value.get('status');
    const projectId = value.get('projectId');

    const params = new URLSearchParams();

    if (status) params.append('status', status);
    else params.append('status', 'in-progress');
    if (projectId) params.append('projectId', projectId);

    params.append('page', pageNumber.toString());

    this.httpClient
      .get<any>(`${myBaseUrl}?${params.toString()}`)
      .subscribe((res) => {
        if (params.get('status') === 'completed') this.tasksAll.next(res);
        this.tasksAll.next([...this.tasksAll.value, ...res]);
      });
  }

  groupTasksByDay(myTasks: any[]) {
    const myMap = new Map();

    myTasks.forEach((element) => {
      const sd = new Date(element.startDate);
      const dateWithoutHours = new Date(
        sd.getFullYear(),
        sd.getMonth(),
        sd.getDate()
      ).toLocaleDateString();

      if (myMap.has(dateWithoutHours)) {
        myMap.get(dateWithoutHours).push(element);
      } else {
        myMap.set(dateWithoutHours, [element]);
      }
    });

    const asd = Array.from(myMap.entries());

    asd.forEach((element: any[]) => {
      element[1] = element[1].sort(
        (a: any, b: any) => b.priorityIndex - a.priorityIndex
      );
    });

    return asd;
  }

  addTask(myData: any, url: any): Observable<any> {
    return this.httpClient.post<any>(url, myData).pipe(
      tap((res) => {
        this.tasksAll.next(res);

        return res;
      })
    );
  }

  deleteTask(_id: string, url: string): Observable<{ _id: string }> {
    return this.httpClient.delete<{ _id: string }>(`${url}/${_id}`).pipe(
      tap((res) => {
        const r = this.tasksAll.value.filter(
          (element: any) => element._id !== _id
        );

        this.tasksAll.next(r);

        return res;
      })
    );
  }

  updateTask(_id: string, myData: any, url: string): Observable<any> {
    return this.httpClient.patch<any>(`${url}/${_id}`, myData).pipe(
      tap((res) => {
        const myIndex = this.tasksAll.value.findIndex(
          (element: any) => element._id === _id
        );

        const element = this.tasksAll.value[myIndex];

        this.tasksAll.value[myIndex] = { ...element, ...myData };

        this.tasksAll.next([...this.tasksAll.value]);

        return res;
      })
    );
  }

  completeTask(_id: string, url: string) {
    const myData = {
      status: 'completed',
      completed: new Date(),
    };

    return this.httpClient.patch<any>(`${url}/${_id}`, myData).pipe(
      tap((res) => {
        const cb = () => {
          const newValue = this.tasksAll.value.filter(
            (element: any) => element._id !== _id
          );

          this.tasksAll.next(newValue);
        };

        setTimeout(cb, 300);

        return res;
      })
    );
  }

  updateManyTasks(myArray: any[], groupArray: any[], url: any) {
    const myObservables = myArray.map((element) => {
      return this.httpClient.patch<any>(
        `${url}/${element._id}`,
        element.myData
      );
    });

    return forkJoin(myObservables).pipe(
      tap((res: any[]) => {
        res.forEach((item, index) => {
          groupArray[index].priorityIndex = item.priorityIndex;
        });

        this.tasksAll.next([...this.tasksAll.value]);

        return res;
      })
    );
  }

  reOrder(event: CdkDragDrop<any[]>, groupArray: any[], url: string) {
    const oldOrdering = groupArray.map((item: any) => ({
      _id: item._id,
      priorityIndex: item.priorityIndex,
    }));

    moveItemInArray(groupArray, event.previousIndex, event.currentIndex);

    const newOrdering = groupArray;

    const myArray: any[] = oldOrdering.map((item, index) => ({
      _id: newOrdering[index]._id,
      myData: {
        priorityIndex: item.priorityIndex,
      },
    }));

    this.updateManyTasks(myArray, groupArray, url).subscribe();
  }
}
