import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-after-confirm',
  templateUrl: './after-confirm.component.html',
  styleUrls: ['./after-confirm.component.scss'],
})
export class AfterConfirmComponent implements OnInit {
  status = false;
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('userId');
    const token = this.activatedRoute.snapshot.paramMap.get('token');
    this.httpClient
      .get(`${environment.baseUrl}confirm-email/${userId}/${token}`)
      .subscribe({
        next: () => {
          this.status = true;
        },
        error: () => {
          this.status = false;
        },
      });
  }
}
