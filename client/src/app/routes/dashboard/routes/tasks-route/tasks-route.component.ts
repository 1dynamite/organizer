import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks-route',
  templateUrl: './tasks-route.component.html',
  styleUrls: ['./tasks-route.component.scss'],
})
export class TasksRouteComponent implements OnInit {
  baseUrlTasks: string | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    this.baseUrlTasks = `users/${userId}/tasks`;
  }
}
