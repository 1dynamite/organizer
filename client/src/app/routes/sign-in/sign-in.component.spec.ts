import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SignInComponent } from './sign-in.component';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let httpController: HttpTestingController;
  let routerSpy: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: Router,
          useValue: {
            navigateByUrl: jasmine.createSpy('navigateByUrl'),
          },
        },
        FormBuilder,
        Validators,
      ],
    }).compileComponents();

    httpController = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get error message', () => {
    let returnValue = component.getErrorMessage('email');

    expect(returnValue).toBe('Required field should not be empty');

    component.signInForm.setValue({ email: 'someEmail', password: '' });
    returnValue = component.getErrorMessage('email');

    expect(returnValue).toBe('Please enter a valid email address');

    component.signInForm.setValue({
      email: 'someEmail@gmail.com',
      password: '1234654654',
    });
    returnValue = component.getErrorMessage('email');

    expect(returnValue).toBe('');
  });

  it('on submit', () => {
    spyOn(localStorage, 'setItem');
    component.onSubmit();

    const request = httpController.expectOne({
      method: 'POST',
    });

    request.flush({ token: 'tokenValue', userId: 'userIdValue' });

    expect(component.serverErrorMessage).toBe('');
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith(
      '/dashboard/tasks'
    );

    component.onSubmit();

    const request2 = httpController.expectOne({
      method: 'POST',
    });

    request2.flush(
      { message: 'some message' },
      { status: 404, statusText: 'Not Found' }
    );

    expect(component.serverErrorMessage).toBe('some message');
  });
});
