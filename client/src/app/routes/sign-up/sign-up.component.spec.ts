import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let httpController: HttpTestingController;
  let routerSpy: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
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
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on submit', () => {
    component.onSubmit();

    const request = httpController.expectOne({
      method: 'POST',
    });

    request.flush('someVlaue');

    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('/confirm-email');

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

  it('should get error message', () => {
    let returnValue = component.getErrorMessage('email');

    expect(returnValue).toBe('Required field should not be empty');

    component.signUpForm.setValue({
      email: 'someEmail',
      password: '',
      nickname: 'somename',
    });
    returnValue = component.getErrorMessage('email');

    expect(returnValue).toBe('Please enter a valid email address');

    component.signUpForm.setValue({
      email: 'someEmail@gmail.com',
      password: '1234654654',
      nickname: 'somename',
    });
    returnValue = component.getErrorMessage('email');

    expect(returnValue).toBe('');
  });
});
