import { Route } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { LoginComponent } from '@micromanager/auth';
import { RegisterComponent } from '@micromanager/auth';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(() => redirectLoggedInTo(['home']))
  },
  {
    path: 'register',
    component: RegisterComponent,
    ...canActivate(() => redirectLoggedInTo(['home']))
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
    ...canActivate(() => redirectUnauthorizedTo(['login']))
  },
];
