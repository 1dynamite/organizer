import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

export interface Task {
  category: string;
  created: Date;
  status: 'Completed' | 'In progress' | 'Failed';
  updated: Date;
}

const ELEMENT_DATA: Task[] = [
  {
    created: new Date(2022, 5, 11),
    category: 'Work',
    status: 'Completed',
    updated: new Date(2022, 5, 11),
  },
  {
    created: new Date(2022, 5, 12),
    category: 'House chores',
    status: 'Completed',
    updated: new Date(2022, 5, 12),
  },
  {
    created: new Date(2022, 5, 13),
    category: 'Family',
    status: 'Completed',
    updated: new Date(2022, 5, 13),
  },
  {
    created: new Date(2022, 5, 14),
    category: 'Entertainment',
    status: 'Failed',
    updated: new Date(2022, 5, 14),
  },
  {
    created: new Date(2022, 5, 16),
    category: 'Work',
    status: 'Completed',
    updated: new Date(2022, 5, 16),
  },
  {
    created: new Date(2022, 5, 21),
    category: 'Family',
    status: 'Failed',
    updated: new Date(2022, 5, 23),
  },
  {
    created: new Date(2022, 5, 22),
    category: 'Work',
    status: 'Completed',
    updated: new Date(2022, 5, 22),
  },
  {
    created: new Date(2022, 5, 29),
    category: 'Work',
    status: 'In progress',
    updated: new Date(2022, 5, 29),
  },
];

@Component({
  selector: 'app-tasks-many',
  templateUrl: './tasks-many.component.html',
  styleUrls: ['./tasks-many.component.scss'],
})
export class TasksManyComponent implements OnInit {
  displayedColumns: string[] = ['created', 'category', 'status', 'updated'];
  dataSource = ELEMENT_DATA;

  constructor() {}

  @ViewChild(MatTable) table!: MatTable<Task>;

  onAddTask(data: Task) {
    console.log('Hello');
    this.dataSource.push(data);
    this.table.renderRows();
  }

  ngOnInit(): void {}
}
