import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from './shared/forms/forms.module';
import { AddTaskComponent } from './dialogs/add-task/add-task.component';
import { EditTaskComponent } from './dialogs/edit-task/edit-task.component';
import { DeleteTaskComponent } from './dialogs/delete-task/delete-task.component';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
