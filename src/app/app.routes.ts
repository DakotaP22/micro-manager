import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '', 
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('@micromanager/landing').then(m => m.HomeComponent)
    }
];
