import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOneTitleComponent } from './task-one-title.component';

describe('TaskOneTitleComponent', () => {
  let component: TaskOneTitleComponent;
  let fixture: ComponentFixture<TaskOneTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskOneTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskOneTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
