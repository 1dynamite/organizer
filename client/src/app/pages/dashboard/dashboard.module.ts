import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from 'src/app/shared/forms/forms.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ControlsInProgressComponent } from './components/controls-in-progress/controls-in-progress.component';
import { ControlsCompletedComponent } from './components/controls-completed/controls-completed.component';
import { TaskItemModule } from './components/task-item/task-item.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    DashboardComponent,
    ControlsInProgressComponent,
    ControlsCompletedComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
    TaskItemModule,
    DragDropModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
