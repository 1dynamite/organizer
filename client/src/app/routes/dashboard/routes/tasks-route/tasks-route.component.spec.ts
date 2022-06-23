import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksRouteComponent } from './tasks-route.component';

describe('TasksRouteComponent', () => {
  let component: TasksRouteComponent;
  let fixture: ComponentFixture<TasksRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
