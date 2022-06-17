import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../dialogs/add-project/add-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  myProjects: { _id: string; title: string }[] = [
    {
      _id: '0',
      title: 'Project #1',
    },
    {
      _id: '1',
      title: 'Project #2',
    },
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  addProject() {
    const dialogRef = this.dialog.open(AddProjectComponent);

    dialogRef
      .afterClosed()
      .subscribe((result: { _id: string; title: string } | undefined) => {
        if (result === undefined) return;

        this.myProjects = [result, ...this.myProjects];
      });
  }

  onEditClick() {}

  onDeleteClick() {}
}
