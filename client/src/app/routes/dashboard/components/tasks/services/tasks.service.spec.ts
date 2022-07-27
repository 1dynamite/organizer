import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TasksService } from './tasks.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

describe('TasksService', () => {
  let service: TasksService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TasksService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reorder tasks', () => {
    service.updateManyTasks = jasmine
      .createSpy('updateManyTasks')
      .and.returnValue(new Observable());

    const groupedTasks = [
      { _id: 'id-1', priorityIndex: 1 },
      { _id: 'id-2', priorityIndex: 2 },
    ];

    const event: any = { previousIndex: 0, currentIndex: 1 };

    service.reOrder(event, groupedTasks, 'someUrl');
    expect(groupedTasks[0]).toEqual({ _id: 'id-2', priorityIndex: 2 });
  });

  it('should update many tasks', () => {
    service.tasksAll.next([
      { _id: 'taskId', startDate: new Date(), priorityIndex: 1 },
      { _id: 'taskId-2', startDate: new Date(), priorityIndex: 2 },
    ]);

    expect(service.tasksAll.value.length).toBe(2);

    const myArray = [
      { _id: 'taskId', myData: { priorityIndex: 9 } },
      { _id: 'taskId-2', myData: { priorityIndex: 8 } },
    ];

    const groupArray = [{ priorityIndex: 1 }, { priorityIndex: 2 }];

    service.updateManyTasks(myArray, groupArray, 'someUrl').subscribe((res) => {
      expect(groupArray[0].priorityIndex).toBe(7);
      expect(groupArray[1].priorityIndex).toBe(6);
    });

    const requests = httpController.match({
      method: 'PATCH',
    });

    expect(requests.length).toBe(2);
    requests[0].flush({ priorityIndex: 7 });
    requests[1].flush({ priorityIndex: 6 });
  });

  it('should complete task', () => {
    service.tasksAll.next([{ _id: 'taskId', a: 'someData' }]);

    expect(service.tasksAll.value.length).toBe(1);

    service.completeTask('taskId', 'someUrl').subscribe(() => {
      jasmine.clock().install();

      jasmine.clock().tick(300);

      expect(service.tasksAll.value).toBe(0);

      jasmine.clock().uninstall();
    });

    const request = httpController.expectOne({
      method: 'PATCH',
      url: 'someUrl/taskId',
    });

    expect(request.request.body.status).toBe('completed');
    expect(new Date().getTime() - request.request.body.completed).toBeLessThan(
      86400000
    );
  });

  it('should update task', () => {
    service.tasksAll.next([{ _id: 'taskId', a: 'someData' }]);

    expect(service.tasksAll.value.length).toBe(1);

    service
      .updateTask('taskId', { a: 'changedData' }, 'someUrl')
      .subscribe(() => {
        expect(service.tasksAll.value).toEqual([
          { _id: 'taskId', a: 'changedData' },
        ]);
      });

    const request = httpController.expectOne({
      method: 'PATCH',
      url: 'someUrl/taskId',
    });

    expect(request.request.body).toEqual({ a: 'changedData' });
  });

  it('should delete task', () => {
    service.tasksAll.next([{ _id: 'taskId' }]);

    expect(service.tasksAll.value.length).toBe(1);

    service.deleteTask('taskId', 'someUrl').subscribe();

    const request = httpController.expectOne({
      method: 'DELETE',
      url: 'someUrl/taskId',
    });

    request.flush([]);

    expect(service.tasksAll.value).toEqual([]);
  });

  it('.addTask should add task', () => {
    service.addTask({ _id: 'taskId' }, 'someUrl').subscribe();

    const request = httpController.expectOne({
      method: 'POST',
      url: 'someUrl',
    });

    request.flush([{ _id: 'taskId' }]);

    expect(service.tasksAll.value).toEqual([{ _id: 'taskId' }]);
  });

  it('.groupTasksByDay should group tasks by day', () => {
    const day19 = new Date('2022-07-19T03:24:00');
    const day20 = new Date('2022-07-20T03:24:00');

    const myTasks = [
      { startDate: day19, priorityIndex: 2 },
      { startDate: day19, priorityIndex: 3 },
      { startDate: day20, priorityIndex: 1 },
    ];

    const groupedTasks = service.groupTasksByDay(myTasks);

    expect(groupedTasks).toEqual([
      [
        '7/19/2022',
        [
          { startDate: day19, priorityIndex: 3 },
          { startDate: day19, priorityIndex: 2 },
        ],
      ],
      ['7/20/2022', [{ startDate: day20, priorityIndex: 1 }]],
    ]);
  });

  it('.getTasks should get appropriate tasks', () => {
    const value = {
      get: (prop: string) => {
        if (prop === 'status') return 'in-progress';
        if (prop === 'projectId') return null;
        return null;
      },
    };

    service.getTasks(value, 'tasks/someId', 2);

    const request = httpController.expectOne({});

    expect(request.request.urlWithParams).toBe(
      'tasks/someId?status=in-progress&page=2'
    );

    const myTasks = [1, 2, 3];

    request.flush(myTasks);

    expect(service.tasksAll.value).toEqual(myTasks);

    service.tasksAll.next([]);

    const value2 = {
      get: (prop: string) => {
        if (prop === 'status') return null;
        if (prop === 'projectId') return 'someProjectId';
        return null;
      },
    };

    service.getTasks(value2, 'tasks/someId', 2);

    const request2 = httpController.expectOne({});

    expect(request2.request.urlWithParams).toBe(
      'tasks/someId?status=in-progress&projectId=someProjectId&page=2'
    );

    const myTasks2 = [1, 2, 3];

    request2.flush(myTasks2);

    expect(service.tasksAll.value).toEqual(myTasks2);

    service.tasksAll.next([]);

    const value3 = {
      get: (prop: string) => {
        if (prop === 'status') return 'completed';
        if (prop === 'projectId') return 'someProjectId';
        return null;
      },
    };

    service.getTasks(value3, 'tasks/someId', 2);

    const request3 = httpController.expectOne({});

    expect(request3.request.urlWithParams).toBe(
      'tasks/someId?status=completed&projectId=someProjectId&page=2'
    );

    const myTasks3 = [1, 2, 3];

    request3.flush(myTasks3);
  });
});
