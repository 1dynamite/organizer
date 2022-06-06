import { Injectable } from '@angular/core';
import { AddTask, EditTask, Status, Task } from '../models/models.tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  #currentIDNumber = 5;
  #tasksMany: Task[] = [
    {
      _id: '1',
      title: "Read 'War and Peace'",
      status: 'in-progress',
      created: new Date(),
      completed: null,
    },
    {
      _id: '2',
      title: 'Go to the gym',
      status: 'in-progress',
      created: new Date(),
      completed: null,
    },
    {
      _id: '3',
      title: 'Burger',
      status: 'completed',
      created: new Date(),
      completed: new Date(),
    },
    {
      _id: '4',
      title: 'Piano',
      status: 'in-progress',
      created: new Date(),
      completed: null,
    },
    {
      _id: '5',
      title: 'Pay the bills',
      status: 'completed',
      created: new Date(),
      completed: new Date(),
    },
  ];

  constructor() {}

  #getUniqueID() {
    return ++this.#currentIDNumber + '';
  }

  getTasksByStatus(status: Status) {
    return this.#tasksMany.filter((element) => element.status === status);
  }

  addTask(myData: AddTask) {
    const myNewTask: Task = {
      ...myData,
      _id: this.#getUniqueID(),
      status: 'in-progress',
      created: new Date(),
      completed: null,
    };

    this.#tasksMany.push(myNewTask);

    this.#tasksMany.sort((a, b) => b.created.getTime() - a.created.getTime());

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

    element.status = 'completed';
    element.completed = new Date();

    return element;
  }
}
