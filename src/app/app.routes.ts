import { Routes } from '@angular/router';
import { workbucket_routes } from './features/workbuckets/pages/workbucket.routes';
import { meeting_routes } from './features/meetings/pages/meetings.routes';
import { auth_routes } from './features/auth/pages/auth.routes';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo,  } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);

export const routes: Routes = [
  {
    path: 'workbucket',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: AppLayoutComponent,
    children: [...workbucket_routes],
  },
  {
    path: 'meetings',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: AppLayoutComponent,
    children: [...meeting_routes],
  },
  {
    path: 'auth',
    children: [...auth_routes],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'workbucket',
  }
];
