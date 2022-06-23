import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [TasksService],
})
export class TasksComponent implements OnInit, OnDestroy {
  selectedIndex = 0;
  @Input() baseUrl: string | undefined;

  queryParamsSubscription!: Subscription;

  constructor(
    public tasksService: TasksService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParamMap.subscribe(
      (value) => {
        const status = value.get('status');

        if (status === 'completed') this.selectedIndex = 1;
        else this.selectedIndex = 0;
      }
    );

    this.tasksService.baseUrlTasks.next(environment.baseUrl + this.baseUrl);
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();

    this.tasksService.todoService.items = [];
  }

  onTabChange(index: number) {
    if (index === 0)
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          status: 'in-progress',
        },
        queryParamsHandling: 'merge',
      });
    else {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          status: 'completed',
        },
        queryParamsHandling: 'merge',
      });
    }
  }
}
