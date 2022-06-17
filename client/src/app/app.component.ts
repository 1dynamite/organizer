import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { Router } from '@angular/router';

interface FoodNode {
  name: { text: string; href: string };
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: { text: 'Tasks', href: '' },
    children: [
      {
        name: {
          text: 'In progress',
          href: '`tasks?status=in-progress',
        },
      },
      { name: { text: 'Completed', href: 'tasks?status=completed' } },
    ],
  },
  {
    name: { text: 'Projects', href: 'projects' },
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: { text: string; href: string };
  level: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  /* private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  constructor(public location: Location, private router: Router) {
    this.dataSource.data = TREE_DATA;
  }

  onClickTree(href: string) {
    this.router.navigateByUrl(href);
  } */

  constructor(public location: Location) {}
}
