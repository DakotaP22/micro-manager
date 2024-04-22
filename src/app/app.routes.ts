import { Routes } from '@angular/router';
import { workbucket_routes } from './features/workbuckets/pages/workbucket.routes';
import { meeting_routes } from './features/meetings/pages/meetings.routes';

export const routes: Routes = [
  {
    path: 'workbucket',
    children: [...workbucket_routes]
  },
  {
    path: 'meetings',
    children: [...meeting_routes]
  }
];
