import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { AddTask, EditTask, Task } from './models/models.tasks';
import { TasksService } from './services/tasks.service';
import { cloneDeep } from 'lodash';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  tasksList = new BehaviorSubject<Task[] | null>(null);

  tasksCompleted: Task[] = [];
  tasksInProgress: Task[] = [];

  subscriptionTasksMany: Subscription;

  constructor(public tasksService: TasksService) {
    this.subscriptionTasksMany = this.tasksList.subscribe((e) => {
      if (e === null) return;

      this.tasksCompleted = e.filter(
        (element) => element.status.value === 'completed'
      );

      this.tasksCompleted.sort((a, b) => b.status.index - a.status.index);

      this.tasksInProgress = e.filter(
        (element) => element.status.value === 'in-progress'
      );

      this.tasksInProgress.sort((a, b) => b.status.index - a.status.index);
    });
  }

  ngOnDestroy(): void {
    this.subscriptionTasksMany.unsubscribe();
  }

  ngOnInit(): void {
    const a = this.tasksService.getTasksByStatus('in-progress');
    const b = this.tasksService.getTasksByStatus('completed');

    const cloned = cloneDeep(a.concat(b));

    this.tasksList.next(cloned);
  }

  addTaskEvent(myData: AddTask) {
    const newTask = this.tasksService.addTask(myData);

    const oldValue = this.tasksList.value;

    if (oldValue === null) return;

    const myTasks = [newTask, ...oldValue];

    this.tasksList.next(myTasks);
  }

  deleteTaskEvent(_id: string) {
    this.tasksService.deleteTask(_id);

    if (this.tasksList.value === null) return;

    const myIndex = this.tasksList.value.findIndex(
      (element) => element._id === _id
    );

    if (myIndex === -1) return;

    this.tasksList.value.splice(myIndex, 1);

    this.tasksList.next(this.tasksList.value);
  }

  editTaskEvent(_id: string, myData: EditTask) {
    this.tasksService.editTask(_id, myData);

    if (this.tasksList.value === null) return;

    const myIndex = this.tasksList.value.findIndex(
      (element) => element._id === _id
    );

    if (myIndex === -1) return;

    const element = this.tasksList.value[myIndex];

    this.tasksList.value[myIndex] = { ...element, ...myData };

    this.tasksList.next(this.tasksList.value);
  }

  completeTaskEvent(_id: string) {
    const res = this.tasksService.completeTask(_id);

    if (res === null) return;

    const currentValue = this.tasksList.value;

    if (currentValue === null) return;

    const myElement = currentValue.find((element) => element._id === _id);

    if (myElement === undefined) return;

    myElement.status = { value: 'completed', index: res.index };
    myElement.completed = new Date();

    this.tasksList.next([...currentValue]);
  }

  drop(event: CdkDragDrop<Task[]>) {
    const preIndex = event.previousIndex;
    const curIndex = event.currentIndex;

    const statusIndexPre = this.tasksInProgress[preIndex].status.index;

    this.tasksInProgress[preIndex].status.index =
      this.tasksInProgress[curIndex].status.index;

    this.tasksInProgress[curIndex].status.index = statusIndexPre;

    moveItemInArray(
      this.tasksInProgress,
      event.previousIndex,
      event.currentIndex
    );
  }

  dropCompleted(event: CdkDragDrop<Task[]>) {
    const preIndex = event.previousIndex;
    const curIndex = event.currentIndex;

    const statusIndexPre = this.tasksCompleted[preIndex].status.index;

    this.tasksCompleted[preIndex].status.index =
      this.tasksCompleted[curIndex].status.index;

    this.tasksCompleted[curIndex].status.index = statusIndexPre;

    moveItemInArray(
      this.tasksCompleted,
      event.previousIndex,
      event.currentIndex
    );
  }
}