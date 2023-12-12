import { Route } from '@angular/router';
import { WorkbucketsPageComponent } from './pages/workbucket-page/workbuckets-page.component';
import { CreateWorkbucketPageComponent } from './pages/create-workbucket-page/create-workbucket-page.component';
import { EditWorkbucketPageComponent } from './pages/edit-workbucket-page/edit-workbucket-page.component';
import { CreateWorkItemPageComponent } from './pages/create-work-item-page/create-work-item-page.component';

export const taskManagerRoutes: Route[] = [
	{
		path: '',
		loadComponent: () => WorkbucketsPageComponent,
	},
	{
		path: 'create',
		loadComponent: () => CreateWorkbucketPageComponent,
	},
	{
		path: ':bucket-id/edit',
		loadComponent: () => EditWorkbucketPageComponent,
	},
	{
		path: ':bucket-id/work-items/create',
		loadComponent: () => CreateWorkItemPageComponent,
	},
	{
		path: ':bucket-id',
		loadComponent: () => WorkbucketsPageComponent,
	},
	

];
