import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOneActionsComponent } from './task-one-actions.component';

describe('TaskOneActionsComponent', () => {
  let component: TaskOneActionsComponent;
  let fixture: ComponentFixture<TaskOneActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskOneActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskOneActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
