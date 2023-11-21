import { Route } from '@angular/router';
import { WorkbucketsPageComponent } from './pages/workbucket-page/workbuckets-page.component';

export const taskManagerRoutes: Route[] = [
	{
		path: '',
		loadComponent: () => WorkbucketsPageComponent,
	},
	{
		path: ':bucket-id/item/:item-id',
		loadComponent: () => WorkbucketsPageComponent,
	},
	{
		path: ':bucket-id',
		loadComponent: () => WorkbucketsPageComponent,
	},

];
