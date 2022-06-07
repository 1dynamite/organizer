import { Injectable } from '@angular/core';
import { AddTask, EditTask, StatusValue, Task } from '../models/models.tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  #currentIDNumber = 5;
  #indexCompleted = 0;
  #indexInProgress = 0;

  #tasksMany: Task[] = [
    {
      _id: '1',
      title: "Read 'War and Peace'",
      status: { value: 'in-progress', index: this.#getIndexInProgress() },
      created: new Date(),
      completed: null,
    },
    {
      _id: '2',
      title: 'Go to the gym',
      status: { value: 'in-progress', index: this.#getIndexInProgress() },
      created: new Date(),
      completed: null,
    },
    {
      _id: '3',
      title: 'Burger',
      status: { value: 'in-progress', index: this.#getIndexInProgress() },
      created: new Date(),
      completed: new Date(),
    },
    {
      _id: '4',
      title: 'Piano',
      status: { value: 'in-progress', index: this.#getIndexInProgress() },
      created: new Date(),
      completed: null,
    },
    {
      _id: '5',
      title: 'Pay the bills',
      status: { value: 'completed', index: this.#getIndexCompleted() },
      created: new Date(),
      completed: new Date(),
    },
  ];

  constructor() {}

  #getUniqueID() {
    return ++this.#currentIDNumber + '';
  }

  #getIndexCompleted() {
    return this.#indexCompleted++;
  }

  #getIndexInProgress() {
    return this.#indexInProgress++;
  }

  getTasksByStatus(statusValue: StatusValue) {
    return this.#tasksMany.filter(
      (element) => element.status.value === statusValue
    );
  }

  addTask(myData: AddTask) {
    const myNewTask: Task = {
      ...myData,
      _id: this.#getUniqueID(),
      status: { value: 'in-progress', index: this.#getIndexInProgress() },
      created: new Date(),
      completed: null,
    };

    this.#tasksMany.push(myNewTask);

    this.#tasksMany.sort((a, b) => b.status.index - a.status.index);

    return myNewTask;
  }

  deleteTask(_id: string) {
    const myIndex = this.#tasksMany.findIndex((element) => element._id === _id);

    if (myIndex === -1) return null;

    const deletedElement = this.#tasksMany.splice(myIndex, 1)[0];

    return deletedElement;
  }

  editTask(_id: string, myData: EditTask) {
    const myIndex = this.#tasksMany.findIndex((element) => element._id === _id);

    if (myIndex === -1) return null;

    const element = this.#tasksMany[myIndex];

    this.#tasksMany[myIndex] = { ...element, ...myData };

    return this.#tasksMany[myIndex];
  }

  completeTask(_id: string) {
    const element = this.#tasksMany.find((element) => element._id === _id);

    if (element === undefined) return null;

    element.status = { value: 'completed', index: this.#getIndexCompleted() };
    element.completed = new Date();

    const res = {
      index: element.status.index,
    };

    return res;
  }
}
