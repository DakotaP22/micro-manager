import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: ':workbucketId',
        loadComponent: () => import("./pages/workbucket-page/workbucket-page.component").then(m => m.WorkbucketPageComponent)
    }
]