import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AddTask, EditTask, Task } from './models/models.tasks';
import { TasksService } from './services/tasks.service';
import { cloneDeep } from 'lodash';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  tasksMany = new BehaviorSubject<Task[] | null>(null);

  tasksCompleted: Task[] = [];
  tasksInProgress: Task[] = [];

  constructor(public tasksService: TasksService) {
    this.tasksMany.subscribe((e) => {
      if (e === null) return;

      this.tasksCompleted = e.filter(
        (element) => element.status === 'completed'
      );

      this.tasksCompleted.sort(
        (a, b) => b.completed!.getTime() - a.completed!.getTime()
      );

      this.tasksInProgress = e.filter(
        (element) => element.status === 'in-progress'
      );
    });
  }

  ngOnInit(): void {
    const a = this.tasksService.getTasksByStatus('in-progress');
    const b = this.tasksService.getTasksByStatus('completed');

    const cloned = cloneDeep(a.concat(b));

    this.tasksMany.next(cloned);
  }

  addTaskEvent(myData: AddTask) {
    const newTask = this.tasksService.addTask(myData);

    const oldValue = this.tasksMany.value;

    if (oldValue === null) return;

    const myTasks = [newTask, ...oldValue];

    this.tasksMany.next(myTasks);
  }

  deleteTaskEvent(_id: string) {
    this.tasksService.deleteTask(_id);

    if (this.tasksMany.value === null) return;

    const myIndex = this.tasksMany.value.findIndex(
      (element) => element._id === _id
    );

    if (myIndex === -1) return;

    this.tasksMany.value.splice(myIndex, 1);

    this.tasksMany.next(this.tasksMany.value);
  }

  editTaskEvent(_id: string, myData: EditTask) {
    this.tasksService.editTask(_id, myData);

    if (this.tasksMany.value === null) return;

    const myIndex = this.tasksMany.value.findIndex(
      (element) => element._id === _id
    );

    if (myIndex === -1) return;

    const element = this.tasksMany.value[myIndex];

    this.tasksMany.value[myIndex] = { ...element, ...myData };

    this.tasksMany.next(this.tasksMany.value);
  }

  completeTaskEvent(_id: string) {
    this.tasksService.completeTask(_id);

    const currentValue = this.tasksMany.value;

    if (currentValue === null) return;

    const myElement = currentValue.find((element) => element._id === _id);

    if (myElement === undefined) return;

    myElement.status = 'completed';
    myElement.completed = new Date();

    this.tasksMany.next([...currentValue]);
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(
      this.tasksInProgress,
      event.previousIndex,
      event.currentIndex
    );
  }

  dropCompleted(event: CdkDragDrop<Task[]>) {
    moveItemInArray(
      this.tasksCompleted,
      event.previousIndex,
      event.currentIndex
    );
  }
}
