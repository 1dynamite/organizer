import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [TodoComponent, TopPanelComponent, TodoItemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule,
    DragDropModule,
    MatProgressBarModule,
  ],
  exports: [TodoComponent, TopPanelComponent, TodoItemComponent],
})
export class TodoModule {}
