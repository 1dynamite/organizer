import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksRewrittenComponent } from './tasks-rewritten.component';

describe('TasksRewrittenComponent', () => {
  let component: TasksRewrittenComponent;
  let fixture: ComponentFixture<TasksRewrittenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksRewrittenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksRewrittenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
