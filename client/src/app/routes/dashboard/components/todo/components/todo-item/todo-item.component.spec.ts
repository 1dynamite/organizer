import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/components/dialogs/delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from 'src/app/components/dialogs/update-dialog/update-dialog.component';

import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    let spy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      providers: [{ provide: MatDialog, useValue: spy }],
    }).compileComponents();

    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete event', () => {
    const event: any = { stopPropagation: jasmine.createSpy('event') };

    const dialogRef = {
      afterClosed: () => ({
        subscribe: (fn: any) => fn(true),
      }),
    } as any;

    dialogSpy.open.and.returnValue(dialogRef);

    component.onDeleteClick(event);

    expect(event.stopPropagation).toHaveBeenCalledOnceWith();

    expect(dialogSpy.open).toHaveBeenCalledOnceWith(DeleteDialogComponent);

    const dialogRef2 = {
      afterClosed: () => ({
        subscribe: (fn: any) => fn(false),
      }),
    } as any;

    dialogSpy.open.and.returnValue(dialogRef2);

    component.onDeleteClick(event);

    expect(event.stopPropagation).toHaveBeenCalledWith();

    expect(dialogSpy.open).toHaveBeenCalledWith(DeleteDialogComponent);
  });

  it('should emit edit event', () => {
    const event: any = { stopPropagation: jasmine.createSpy('event') };

    const dialogRef = {
      afterClosed: () => ({
        subscribe: (fn: any) => fn(true),
      }),
    } as any;

    dialogSpy.open.and.returnValue(dialogRef);

    component.onEditClick(event);

    expect(event.stopPropagation).toHaveBeenCalledOnceWith();

    expect(dialogSpy.open).toHaveBeenCalledOnceWith(UpdateDialogComponent, {
      data: { title: '', dialogTitle: '' },
    });

    const dialogRef2 = {
      afterClosed: () => ({
        subscribe: (fn: any) => fn(undefined),
      }),
    } as any;

    dialogSpy.open.and.returnValue(dialogRef2);

    component.onEditClick(event);

    expect(event.stopPropagation).toHaveBeenCalledWith();
    expect(dialogSpy.open).toHaveBeenCalledWith(UpdateDialogComponent, {
      data: { title: '', dialogTitle: '' },
    });
  });
});
