import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemCompletedComponent } from './task-item-completed.component';

describe('TaskItemCompletedComponent', () => {
  let component: TaskItemCompletedComponent;
  let fixture: ComponentFixture<TaskItemCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskItemCompletedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
