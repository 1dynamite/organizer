import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app.guard';
import { SignInComponent } from './routes/sign-in/sign-in.component';
import { SignUpComponent } from './routes/sign-up/sign-up.component';
import { AfterConfirmComponent } from './routes/after-confirm/after-confirm.component';
import { ConfirmEmailComponent } from './routes/confirm-email/confirm-email.component';
import { ProjectItemRouteComponent } from './routes/dashboard/routes/project-item-route/project-item-route.component';
import { ProjectsRouteComponent } from './routes/dashboard/routes/projects-route/projects-route.component';
import { TasksRouteComponent } from './routes/dashboard/routes/tasks-route/tasks-route.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/tasks',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent,
  },
  {
    path: 'after-confirm/:userId/:token',
    component: AfterConfirmComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AppGuard],
    children: [
      {
        path: 'tasks',
        component: TasksRouteComponent,
      },
      {
        path: 'projects',
        component: ProjectsRouteComponent,
      },
      {
        path: 'projects/:projectId',
        component: ProjectItemRouteComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
