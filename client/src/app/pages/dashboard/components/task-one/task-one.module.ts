import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { TaskOneInProgressComponent } from './task-one-in-progress/task-one-in-progress.component';
import { TaskOneCompletedComponent } from './task-one-completed/task-one-completed.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from 'src/app/shared/forms/forms.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [TaskOneInProgressComponent, TaskOneCompletedComponent],
  imports: [
    CommonModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
  ],
  exports: [TaskOneInProgressComponent, TaskOneCompletedComponent],
})
export class TaskOneModule {}
