import { Routes } from '@angular/router';
import { workbucket_routes } from './features/workbuckets/pages/workbucket.routes';
import { meeting_routes } from './features/meetings/pages/meetings.routes';
import { auth_routes } from './features/auth/pages/auth.routes';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';

export const routes: Routes = [
  {
    path: 'workbucket',
    component: AppLayoutComponent,
    children: [...workbucket_routes],
  },
  {
    path: 'meetings',
    component: AppLayoutComponent,
    children: [...meeting_routes],
  },
  {
    path: 'auth',
    children: [...auth_routes],
  },
];
