import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  @Input() projectId!: string;

  totalNumber = 0;
  completedNumber = 0;
  progressValue = 0;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get<any>(`${baseUrl}tasks?projectId=${this.projectId}`)
      .subscribe((tasks) => {
        this.totalNumber = tasks.length;

        const completedTasks = tasks.filter(
          (element: any) => element.status === 'completed'
        );

        this.completedNumber = completedTasks.length;

        this.progressValue = (this.completedNumber / this.totalNumber) * 100;
      });
  }
}
