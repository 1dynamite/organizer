import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TasksRouteComponent } from './tasks-route.component';

describe('TasksRouteComponent', () => {
  let component: TasksRouteComponent;
  let fixture: ComponentFixture<TasksRouteComponent>;
  let routerSpy: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksRouteComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigateByUrl: jasmine.createSpy('navigateByUrl'),
          },
        },
      ],
    }).compileComponents();

    routerSpy = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set base url for tasks', () => {
    spyOn(localStorage, 'getItem').and.returnValue('userId');

    component.ngOnInit();

    expect(localStorage.getItem).toHaveBeenCalledOnceWith('userId');
    expect(component.baseUrlTasks).toBe(
      `${environment.baseUrl}users/userId/tasks`
    );
  });
});
