import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskByStatusComponent } from './task-by-status.component';

describe('TaskByStatusComponent', () => {
  let component: TaskByStatusComponent;
  let fixture: ComponentFixture<TaskByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskByStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
