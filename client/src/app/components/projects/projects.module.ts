import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { TodoModule } from '../todo/todo.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProjectsComponent, ProgressBarComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    TodoModule,
    DragDropModule,
    MatProgressBarModule,
  ],
})
export class ProjectsModule {}
