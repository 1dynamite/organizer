import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { DeleteDialogComponent } from './delete-dialog.component';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialogRef<DeleteDialogComponent>>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [DeleteDialogComponent],
      providers: [{ provide: MatDialogRef, useValue: spy }],
    }).compileComponents();

    dialogSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<DeleteDialogComponent>
    >;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should perform/cancel deletion', () => {
    component.onNoClick();

    expect(dialogSpy.close).toHaveBeenCalledOnceWith(false);

    component.onClickDelete();

    expect(dialogSpy.close).toHaveBeenCalledWith(true);
  });
});
