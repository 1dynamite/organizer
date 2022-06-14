import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksPanelComponent } from './components/tasks-panel/tasks-panel.component';
import { TaskItemModule } from './components/task-item/task-item.module';
import { TasksService } from './services/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksComponent, TasksPanelComponent],
      imports: [
        TaskItemModule,
        MatSnackBarModule,
        HttpClientModule,
        MatCheckboxModule,
      ],
      providers: [TasksService, MatSnackBar],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
