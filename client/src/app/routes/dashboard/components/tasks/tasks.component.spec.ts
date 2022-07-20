import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { TasksService } from './services/tasks.service';

import { TasksComponent } from './tasks.component';

const tsmock = {
  getTasks: jasmine.createSpy('getTasks'),
  tasksAll: {
    subscribe: (fn: any) => {
      fn([{ repeated: true }]);
      return { unsubscribe: () => {} };
    },
    value: [],
    next: jasmine.createSpy('next'),
  },
  tasksGroupedByDay: [],
  groupTasksByDay: jasmine.createSpy('groupTasksByDay'),
  commonTasks: [],
  addTask: jasmine.createSpy('addTask').and.returnValue({
    subscribe: (obj: any) => {
      obj.next();
    },
  }),
  updateTask: jasmine.createSpy('addTask').and.returnValue({
    subscribe: (obj: any) => {
      obj.next();
    },
  }),
  deleteTask: jasmine.createSpy('addTask').and.returnValue({
    subscribe: (obj: any) => {
      obj.next();
    },
  }),
  completeTask: jasmine.createSpy('addTask').and.returnValue({
    subscribe: (obj: any) => {
      obj.next();
    },
  }),
  reOrder: jasmine.createSpy('reOrder'),
};

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let tasksServiceMock: TasksService;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: any;

  beforeEach(async () => {
    let spy = jasmine.createSpyObj('MatDialog', ['open']);

    let spyRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      providers: [
        { provide: MatDialog, useValue: spy },
        { provide: TasksService, useValue: tsmock },
        { provide: Router, useValue: spyRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: 'paramMap' },
            queryParamMap: {
              subscribe: (fn: any) => {
                fn({ get: (str: string) => 'status' });
                return { unsubscribe: () => {} };
              },
            },
          },
        },
        {
          provide: AlertService,
          useValue: {
            success: jasmine.createSpy('success'),
            error: jasmine.createSpy('error'),
          },
        },
      ],
    }).compileComponents();

    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    tasksServiceMock = TestBed.inject(TasksService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRouteSpy = TestBed.inject(
      ActivatedRoute
    ) as jasmine.SpyObj<ActivatedRoute>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    expect(component.selectedIndex).toBe(0);
    expect(tasksServiceMock.getTasks).toHaveBeenCalled();
  });

  it('should tabe change', () => {
    component.onTabChange(0);
    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    component.onTabChange(1);
    expect(routerSpy.navigate).toHaveBeenCalledTimes(2);
  });

  it('should get tasks upon scroll bottom', () => {
    const event = {
      target: { scrollHeight: 3, scrollTop: 2, clientHeight: 1 },
    };
    component.scrollEvent(event);
    expect(tasksServiceMock.getTasks).toHaveBeenCalledWith(
      activatedRouteSpy.snapshot.paramMap,
      component.baseUrl,
      component.pageNumber
    );
  });

  it('should add item', () => {
    component.addItem('someData');

    expect(tasksServiceMock.addTask).toHaveBeenCalledWith(
      'someData',
      component.baseUrl
    );
  });

  it('should edit item', () => {
    component.onEditItem('id', 'someData');

    expect(tasksServiceMock.updateTask).toHaveBeenCalledWith(
      'id',
      'someData',
      component.baseUrl
    );
  });

  it('should delete item', () => {
    component.onDeleteItem('id');

    expect(tasksServiceMock.deleteTask).toHaveBeenCalledWith(
      'id',
      component.baseUrl
    );
  });

  it('should complete item', () => {
    component.onCompleteTask('id');

    expect(tasksServiceMock.completeTask).toHaveBeenCalledWith(
      'id',
      component.baseUrl
    );
  });

  it('should reorder', () => {
    component.drop('event' as any, []);

    expect(tasksServiceMock.reOrder).toHaveBeenCalledTimes(1);
  });

  it('should openDialog', () => {
    dialogSpy.open.and.returnValue({
      afterClosed: () => ({
        // @ts-ignore: Unreachable code error
        subscribe: (fn: any) => {
          fn(undefined);
        },
      }),
    });

    component.openDialog();

    expect(dialogSpy.open).toHaveBeenCalledTimes(1);
  });
});
