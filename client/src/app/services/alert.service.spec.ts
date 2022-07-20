import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from './alert.service';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

describe('AlertService', () => {
  let service: AlertService;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);

    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: spy }],
    });

    service = TestBed.inject(AlertService);
    matSnackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('.openSnackBar should call "snackbar.openFromComponent" once with necessary arguments', () => {
    const className = 'class-name',
      message = 'some message';
    service.openSnackBar(className, message);

    expect(matSnackBarSpy.openFromComponent).toHaveBeenCalledOnceWith(
      SnackbarComponent,
      { duration: 5000, panelClass: [className], data: { message } }
    );
  });

  it('.error should call "openSnackBar" with necessary arguments', () => {
    const message = 'some message';

    service.openSnackBar = jasmine.createSpy('openSnackBar');

    service.error(message);

    expect(service.openSnackBar).toHaveBeenCalledOnceWith(
      'error-snackbar',
      message
    );
  });

  it('.info should call "openSnackBar" with necessary arguments', () => {
    const message = 'some message';

    service.openSnackBar = jasmine.createSpy('openSnackBar');

    service.info(message);

    expect(service.openSnackBar).toHaveBeenCalledOnceWith(
      'info-snackbar',
      message
    );
  });

  it('.success should call "openSnackBar" with necessary arguments', () => {
    const message = 'some message';

    service.openSnackBar = jasmine.createSpy('openSnackBar');

    service.success(message);

    expect(service.openSnackBar).toHaveBeenCalledOnceWith(
      'success-snackbar',
      message
    );
  });
});
