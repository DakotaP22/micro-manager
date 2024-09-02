import { Routes } from '@angular/router';
import { redirect } from '../../../shared/components/redirect-component/redirect-utils';
import { defaultWorkbucketResolver } from './workbucket.resolvers';



export const workbucket_routes: Routes = [
  redirect({
    path: '',
    pathMatch: 'full',
    message: 'Redirecting...',
    redirectResolver: defaultWorkbucketResolver
  }),
  {
    path: ':id',
    loadComponent: () =>
      import('./workbucket-page/workbucket-page.component').then(
        (m) => m.WorkbucketPageComponent
      ),
  },
];
