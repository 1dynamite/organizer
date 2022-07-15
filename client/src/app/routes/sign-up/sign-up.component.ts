import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    nickname: ['', Validators.required],
  });

  serverErrorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.httpClient.post(`${baseUrl}users`, this.signUpForm.value).subscribe({
      next: (value: any) => {
        this.router.navigateByUrl('/confirm-email');
      },
      error: (error: HttpErrorResponse) => {
        this.serverErrorMessage = error.error.message;
      },
    });
  }

  getErrorMessage(field: string): string {
    if (this.signUpForm.get(field)?.hasError('required')) {
      return 'Required field should not be empty';
    }

    if (this.signUpForm.get(field)?.hasError('email')) {
      return 'Please enter a valid email address';
    }

    return this.signUpForm.get(field)?.hasError('minlength')
      ? 'Password should contain at least 8 characters'
      : '';
  }
}
