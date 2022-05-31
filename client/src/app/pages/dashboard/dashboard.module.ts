import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksManyComponent } from './tasks-many/tasks-many.component';
import { DashboardComponent } from './dashboard.component';
import { ControlsComponent } from './tasks-many/controls/controls.component';
import { MatButtonModule } from '@angular/material/button';
import { TaskOneComponent } from './tasks-many/task-one/task-one.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { AddTaskComponent } from './tasks-many/dialogs/add-task/add-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from 'src/app/shared/forms/forms.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CheckIconComponent } from './tasks-many/check-icon/check-icon.component';
import { ClockIconComponent } from './tasks-many/clock-icon/clock-icon.component';
import { EditTaskComponent } from './tasks-many/dialogs/edit-task/edit-task.component';
import { DeleteTaskComponent } from './tasks-many/dialogs/delete-task/delete-task.component';

@NgModule({
  declarations: [
    TasksManyComponent,
    DashboardComponent,
    ControlsComponent,
    TaskOneComponent,
    AddTaskComponent,
    CheckIconComponent,
    ClockIconComponent,
    EditTaskComponent,
    DeleteTaskComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatDialogModule,
    FormsModule,
    MatButtonToggleModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
