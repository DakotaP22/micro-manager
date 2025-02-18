import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: ':id',
        loadComponent: () => import("./pages/workbucket-page/workbucket-page.component").then(m => m.WorkbucketPageComponent)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: () => {
            return '1';
        }
    }
]