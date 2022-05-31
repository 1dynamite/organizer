import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksManyComponent } from './tasks-many.component';

describe('TasksManyComponent', () => {
  let component: TasksManyComponent;
  let fixture: ComponentFixture<TasksManyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksManyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksManyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
