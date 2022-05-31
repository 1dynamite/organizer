import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksManyComponent } from './tasks-many/tasks-many.component';
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from './dashboard.component';
import { ControlsComponent } from './tasks-many/controls/controls.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TasksManyComponent, DashboardComponent, ControlsComponent],
  imports: [CommonModule, MatTableModule, MatButtonModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
