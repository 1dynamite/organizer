import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../tasks-many.component';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit {
  @Output() addTaskEvent = new EventEmitter<Task>();

  constructor() {}

  onAddTask() {
    this.addTaskEvent.emit({
      created: new Date(),
      category: 'Work',
      status: 'In progress',
      updated: new Date(),
    });
  }

  ngOnInit(): void {}
}
