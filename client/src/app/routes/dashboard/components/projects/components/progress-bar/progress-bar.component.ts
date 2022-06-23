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
  @Input() totalNumber = 0;
  @Input() completedNumber = 0;
  progressValue = 0;

  constructor() {}

  ngOnInit(): void {
    this.progressValue = (this.completedNumber / this.totalNumber) * 100;
  }
}
