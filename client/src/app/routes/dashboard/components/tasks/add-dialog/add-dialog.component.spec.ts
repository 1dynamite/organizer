import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { AddDialogComponent } from './add-dialog.component';

describe('AddDialogComponent', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AddDialogComponent>>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      declarations: [AddDialogComponent],
      providers: [{ provide: MatDialogRef, useValue: spy }],
    }).compileComponents();

    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<AddDialogComponent>
    >;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialog ref with void', () => {
    component.onNoClick();

    expect(dialogRefSpy.close).toHaveBeenCalledOnceWith();
  });

  it('should call dialog ref with necessary arguments', () => {
    component.onClickSave();

    expect(dialogRefSpy.close).toHaveBeenCalledOnceWith({
      title: component.title.value,
      startDate: component.startDate.value,
      interval: component.interval.value,
      iterations: component.iterations.value,
      repeated: component.repeated.value,
    });
  });

  it('should return error message', () => {
    const error = component.getErrorMessage();

    expect(error).toBe('Required field should not be empty');

    component.title.setValue('someValue');

    expect(component.getErrorMessage()).toBe('');
  });
});
