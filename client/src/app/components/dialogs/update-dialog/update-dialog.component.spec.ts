import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { UpdateDialogComponent } from './update-dialog.component';

describe('UpdateDialogComponent', () => {
  let component: UpdateDialogComponent;
  let fixture: ComponentFixture<UpdateDialogComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialogRef<UpdateDialogComponent>>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [UpdateDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: spy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { title: 'title', dialogTitle: 'dialog title' },
        },
      ],
    }).compileComponents();

    dialogSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<UpdateDialogComponent>
    >;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel/save', () => {
    component.onNoClick();

    expect(dialogSpy.close).toHaveBeenCalledOnceWith();

    component.onClickSave();

    expect(dialogSpy.close).toHaveBeenCalledWith({ title: 'title' });
  });

  it('should get error message', () => {
    component.getErrorMessage();

    expect(component.getErrorMessage()).toBe('');

    component.title.setErrors({ required: true });

    component.getErrorMessage();

    expect(component.getErrorMessage()).toBe(
      'Required field should not be empty'
    );
  });
});
