import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksModule } from './components/dashboard/tasks.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from './shared/forms/forms.module';
import { AddTaskComponent } from './components/dialogs/add-task/add-task.component';
import { EditTaskComponent } from './components/dialogs/edit-task/edit-task.component';
import { DeleteTaskComponent } from './components/dialogs/delete-task/delete-task.component';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProjectsModule } from './components/projects/projects.module';
import { AddProjectComponent } from './components/dialogs/add-project/add-project.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    SnackbarComponent,
    AddProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TasksModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    ProjectsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
