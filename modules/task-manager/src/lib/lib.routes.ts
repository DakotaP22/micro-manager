import { Route } from '@angular/router';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { WorkbucketsPageComponent } from './task-manager/pages/workbucket-page/workbuckets-page.component';

export const taskManagerRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => TaskManagerComponent,
    loadChildren: () => [
      {
        path: '',
        loadComponent: () => WorkbucketsPageComponent
      },
      {
        path: 'item/:id',
        loadComponent: () => WorkbucketsPageComponent
      }
    ]
  },
];
