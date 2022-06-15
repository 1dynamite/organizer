import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from 'src/app/shared/forms/forms.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskItemModule } from './components/task-item/task-item.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TasksPanelComponent } from './components/tasks-panel/tasks-panel.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [TasksComponent, TasksPanelComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
    TaskItemModule,
    DragDropModule,
    MatTabsModule,
  ],
  exports: [TasksComponent],
})
export class TasksModule {}
