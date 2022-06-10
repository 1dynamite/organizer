import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from 'src/app/shared/forms/forms.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskItemModule } from './components/task-item/task-item.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TasksPanelComponent } from './components/tasks-panel/tasks-panel.component';

@NgModule({
  declarations: [DashboardComponent, TasksPanelComponent],
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
