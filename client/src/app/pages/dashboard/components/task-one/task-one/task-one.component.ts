import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-one',
  templateUrl: './task-one.component.html',
  styleUrls: ['./task-one.component.scss'],
})
export class TaskOneComponent implements OnInit {
  rippleDisabled = false;

  constructor() {}

  ngOnInit(): void {}

  stopCheckBoxPropagation(e: Event) {
    e.stopPropagation();
  }

  onInnerElementOver() {
    this.rippleDisabled = true;
  }

  onInnerElementOut() {
    this.rippleDisabled = false;
  }
}
