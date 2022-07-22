import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-item-route',
  templateUrl: './project-item-route.component.html',
  styleUrls: ['./project-item-route.component.scss'],
})
export class ProjectItemRouteComponent implements OnInit {
  baseUrlTasks: string | undefined;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    this.baseUrlTasks = `${
      environment.baseUrl
    }users/${userId}/projects/${this.activatedRoute.snapshot.paramMap.get(
      'projectId'
    )}/tasks`;
  }
}
