import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { TaskItemInProgressComponent } from './task-item-in-progress/task-item-in-progress.component';
import { TaskItemCompletedComponent } from './task-item-completed/task-item-completed.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from 'src/app/shared/forms/forms.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [TaskItemInProgressComponent, TaskItemCompletedComponent],
  imports: [
    CommonModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
  ],
  exports: [TaskItemInProgressComponent, TaskItemCompletedComponent],
})
export class TaskItemModule {}
