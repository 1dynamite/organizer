import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-item-route',
  templateUrl: './project-item-route.component.html',
  styleUrls: ['./project-item-route.component.scss'],
})
export class ProjectItemRouteComponent implements OnInit {
  baseUrlTasks: string | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) this.router.navigateByUrl('/sign-in');
    else {
      this.baseUrlTasks = `users/${userId}/projects/${this.activatedRoute.snapshot.paramMap.get(
        'projectId'
      )}/tasks`;
    }
  }
}
