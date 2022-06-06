import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-status-check-box',
  templateUrl: './status-check-box.component.html',
  styleUrls: ['./status-check-box.component.scss'],
})
export class StatusCheckBoxComponent implements OnInit {
  @Input() checked = new FormControl(false);

  constructor() {}

  ngOnInit(): void {}
}
