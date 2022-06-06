import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOneInProgressComponent } from './task-one-in-progress.component';

describe('TaskOneInProgressComponent', () => {
  let component: TaskOneInProgressComponent;
  let fixture: ComponentFixture<TaskOneInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskOneInProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskOneInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
