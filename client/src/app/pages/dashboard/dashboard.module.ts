import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksManyComponent } from './tasks-many/tasks-many.component';
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [TasksManyComponent, DashboardComponent],
  imports: [CommonModule, MatTableModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
