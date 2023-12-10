import { Route } from '@angular/router';
import { WorkbucketsPageComponent } from './pages/workbucket-page/workbuckets-page.component';
import { CreateWorkbucketPageComponent } from './pages/create-workbucket-page/create-workbucket-page.component';
import { EditWorkbucketPageComponent } from './pages/edit-workbucket-page/edit-workbucket-page.component';

export const taskManagerRoutes: Route[] = [
	{
		path: 'create',
		loadComponent: () => CreateWorkbucketPageComponent,
	},
	{
		path: '',
		loadComponent: () => WorkbucketsPageComponent,
	},
	{
		path: ':bucket-id/edit',
		loadComponent: () => EditWorkbucketPageComponent,
	},
	{
		path: ':bucket-id',
		loadComponent: () => WorkbucketsPageComponent,
	},
	

];
