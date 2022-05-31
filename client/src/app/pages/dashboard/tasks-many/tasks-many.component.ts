import { Component, OnInit } from '@angular/core';
import Task from './task-one/task.model';

@Component({
  selector: 'app-tasks-many',
  templateUrl: './tasks-many.component.html',
  styleUrls: ['./tasks-many.component.scss'],
})
export class TasksManyComponent implements OnInit {
  tasksMany: Task[] = [
    {
      title: "Read 'War and Peace'",
      status: 'in-progress',
    },
    {
      title: 'Go to the gym',
      status: 'in-progress',
    },
    {
      title: 'Pay the bills',
      status: 'completed',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  addTask(task: Task) {
    if (task) this.tasksMany.push(task);
  }

  deleteTask(index: number) {
    this.tasksMany.splice(index, 1);
  }

  editTask(result: { index: number; data: Task }) {
    this.tasksMany[result.index] = result.data;
  }
}
