import { Route } from '@angular/router';
import {
	canActivate,
	redirectUnauthorizedTo,
	redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { LoginComponent } from '@micromanager/auth';
import { RegisterComponent } from '@micromanager/auth';
import { taskManagerRoutes } from '@micromanager/task-manager';

export const appRoutes: Route[] = [
	{
		path: 'buckets',
		loadComponent: () =>
			import('@micromanager/layout').then((m) => m.LayoutComponent),
		children: [...taskManagerRoutes],
		...canActivate(() => redirectUnauthorizedTo(['login'])),
	},
	{
		path: 'login',
		component: LoginComponent,
		...canActivate(() => redirectLoggedInTo(['buckets'])),
	},
	{
		path: 'register',
		component: RegisterComponent,
		...canActivate(() => redirectLoggedInTo(['buckets'])),
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		loadComponent: () =>
			import('@micromanager/landing').then((m) => m.HomeComponent),
	},
];
