import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from 'src/app/shared/forms/forms.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskItemComponent } from './task-item.component';

@NgModule({
  declarations: [TaskItemComponent],
  imports: [
    CommonModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
  ],
  exports: [TaskItemComponent],
})
export class TaskItemModule {}
