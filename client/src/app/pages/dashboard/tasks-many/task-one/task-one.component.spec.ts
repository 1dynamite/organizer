import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOneComponent } from './task-one.component';

describe('TaskOneComponent', () => {
  let component: TaskOneComponent;
  let fixture: ComponentFixture<TaskOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
