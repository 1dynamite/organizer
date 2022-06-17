import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import { SnackbarComponent } from './snackbar.component';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackbarComponent],
      imports: [MatIconModule],
      providers: [
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: { message: 'Task successfully created!' },
        },
        { provide: MatSnackBarRef, useValue: { dismiss: () => {} } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <p> with "Task successfully created!"', () => {
    const snackbarElement: HTMLElement = fixture.nativeElement;
    const p = snackbarElement.querySelector('p')!;
    expect(p.textContent).toEqual('Task successfully created!');
  });
});
