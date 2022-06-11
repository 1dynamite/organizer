import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from 'src/app/shared/forms/forms.module';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EditTaskComponent } from './edit-task.component';

describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTaskComponent],
      imports: [MatButtonModule, FormsModule, BrowserAnimationsModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { title: 'A title for some task' },
        },
        { provide: MatDialogRef, useValue: { close: () => {} } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
