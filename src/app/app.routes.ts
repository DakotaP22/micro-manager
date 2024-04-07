import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'workbucket/:id',
    loadComponent: () =>
      import(
        './features/workbuckets/pages/workbucket-page/workbucket-page.component'
      ).then((m) => m.WorkbucketPageComponent),
  },
];
