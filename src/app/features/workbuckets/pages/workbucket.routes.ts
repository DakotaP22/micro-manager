import { Routes } from '@angular/router';

export const workbucket_routes: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./workbucket-page/workbucket-page.component').then(
        (m) => m.WorkbucketPageComponent
      ),
  },
];
