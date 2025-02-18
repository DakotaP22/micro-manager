import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { routes as WorkbucketRoutes } from './feature/workbucket/workbucket.routes';
import { inject } from '@angular/core';
import { AuthService } from './feature/auth/auth.service';
import { authGuard } from './feature/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'app',
        component: LayoutComponent,
        canActivate: [authGuard],
        loadChildren: () => [
            {
                path: 'workbucket',
                loadChildren: () => WorkbucketRoutes
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'workbucket'
            }
        ]
    }
];
