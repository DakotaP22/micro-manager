import { Route } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('@micromanager/auth').then((m) => m.LoginComponent),
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
