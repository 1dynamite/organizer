import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemInProgressComponent } from './task-item-in-progress.component';

describe('TaskOneInProgressComponent', () => {
  let component: TaskItemInProgressComponent;
  let fixture: ComponentFixture<TaskItemInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskItemInProgressComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
