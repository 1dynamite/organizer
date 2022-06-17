import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UpdateDialogComponent } from '../dialogs/update-dialog/update-dialog.component';
import {
  AddProjectInterface,
  EditProjectInterface,
} from './models/projects.models';
import { ProjectsService } from './services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ProjectsService],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  completed: boolean = false;

  constructor(
    public projectsService: ProjectsService,
    public dialog: MatDialog,
    public alertService: AlertService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: { title: '', dialogTitle: 'Add project' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === undefined) return;

      this.addProjectEvent(result);
    });
  }

  addProjectEvent(myData: AddProjectInterface) {
    const myObserver = {
      next: (res: any) => {
        this.alertService.success('Successfully added!');
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.error(err.error.message);
      },
    };

    this.projectsService.addProject(myData).subscribe(myObserver);
  }

  editProjectEvent(_id: string, myData: EditProjectInterface) {
    const myObserver = {
      next: (res: any) => {
        this.alertService.success('Successfully edited!');
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.error(err.error.message);
      },
    };

    this.projectsService.updateProject(_id, myData).subscribe(myObserver);
  }

  deleteProjectEvent(_id: string) {
    const myObserver = {
      next: (res: { _id: string }) => {
        this.alertService.success('Successfully deleted!');
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.error(err.error.message);
      },
    };

    this.projectsService.deleteProject(_id).subscribe(myObserver);
  }

  drop(event: CdkDragDrop<any[]>) {
    this.projectsService.reOrder(event);
  }

  onClickItem(_id: string) {
    this.router.navigateByUrl(`projects/${_id}`);
  }
}
