import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

import { TasksPanelComponent } from './tasks-panel.component';

describe('TasksPanelComponent', () => {
  let component: TasksPanelComponent;
  let fixture: ComponentFixture<TasksPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksPanelComponent],
      imports: [MatButtonModule, MatCheckboxModule, MatDialogModule],
      providers: [MatDialog],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
