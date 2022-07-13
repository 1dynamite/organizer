import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from './shared/forms/forms.module';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { UpdateDialogComponent } from './components/dialogs/update-dialog/update-dialog.component';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { TodoModule } from './routes/dashboard/components/todo/todo.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProjectsModule } from './routes/dashboard/components/projects/projects.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { AppInterceptor } from './app.interceptor';
import { TasksRouteComponent } from './routes/dashboard/routes/tasks-route/tasks-route.component';
import { ProjectsRouteComponent } from './routes/dashboard/routes/projects-route/projects-route.component';
import { ProjectItemRouteComponent } from './routes/dashboard/routes/project-item-route/project-item-route.component';
import { ConfirmEmailComponent } from './routes/confirm-email/confirm-email.component';
import { AfterConfirmComponent } from './routes/after-confirm/after-confirm.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { SignInComponent } from './routes/sign-in/sign-in.component';
import { SignUpComponent } from './routes/sign-up/sign-up.component';
import { TasksRewrittenComponent } from './routes/dashboard/components/tasks-rewritten/tasks-rewritten.component';
import { AddDialogComponent } from './routes/dashboard/components/tasks-rewritten/add-dialog/add-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    AppComponent,
    SnackbarComponent,
    UpdateDialogComponent,
    DeleteDialogComponent,
    TasksRouteComponent,
    ProjectsRouteComponent,
    ProjectItemRouteComponent,
    ConfirmEmailComponent,
    AfterConfirmComponent,
    DashboardComponent,
    TasksRewrittenComponent,
    AddDialogComponent,
  ],
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule,
    TodoModule,
    MatCheckboxModule,
    DragDropModule,
    MatProgressBarModule,
    MatTabsModule,
    ProjectsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
