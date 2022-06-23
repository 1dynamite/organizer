import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  serverErrorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.httpClient.post(`${baseUrl}sign-in`, this.signInForm.value).subscribe({
      next: (value: any) => {
        this.serverErrorMessage = '';
        localStorage.setItem('token', value.token);
        localStorage.setItem('userId', value.userId);
        this.router.navigateByUrl('/dashboard/tasks');
      },
      error: (error: HttpErrorResponse) => {
        this.serverErrorMessage = error.error.message;
      },
    });
  }

  getErrorMessage(field: string): string {
    if (this.signInForm.get(field)?.hasError('required')) {
      return 'Required field should not be empty';
    }

    if (this.signInForm.get(field)?.hasError('email')) {
      return 'Please enter a valid email address';
    }

    return '';
  }
}
