import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Component({
  selector: 'app-project-title-chip',
  templateUrl: './project-title-chip.component.html',
  styleUrls: ['./project-title-chip.component.scss'],
})
export class ProjectTitleChipComponent implements OnInit {
  @Input() projectId: string | undefined = '';
  title = '';
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    if (this.projectId === undefined) return;
    this.httpClient
      .get<any>(`${baseUrl}projects/${this.projectId}`)
      .subscribe((res) => {
        this.title = res.title;
      });
  }
}
