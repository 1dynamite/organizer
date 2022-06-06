import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOneCompletedComponent } from './task-one-completed.component';

describe('TaskOneCompletedComponent', () => {
  let component: TaskOneCompletedComponent;
  let fixture: ComponentFixture<TaskOneCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskOneCompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskOneCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
