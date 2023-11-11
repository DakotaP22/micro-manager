  import { Route } from '@angular/router';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { LoginComponent } from '@micromanager/auth';
import { RegisterComponent } from '@micromanager/auth';

export const appRoutes: Route[] = [
  {
    path: 'buckets',
    loadChildren: () =>
      import('@micromanager/task-manager').then((m) => m.taskManagerRoutes),
      ...canActivate(() => redirectUnauthorizedTo(['login'])),
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(() => redirectLoggedInTo(['buckets'])),
  },
  {
    path: 'register',
    component: RegisterComponent,
    ...canActivate(() => redirectLoggedInTo(['buckets'])),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('@micromanager/landing').then((m) => m.HomeComponent),
  },
];
