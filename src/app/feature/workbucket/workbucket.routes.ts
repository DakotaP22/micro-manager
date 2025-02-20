import { inject } from "@angular/core";
import { collection, Firestore, getDocs } from "@angular/fire/firestore";
import { Router, Routes } from "@angular/router";
import { AuthService } from "../auth/auth.service";

export const routes: Routes = [
    {
        path: ':workbucketId',
        loadComponent: () => import("./pages/workbucket-page/workbucket-page.component").then(m => m.WorkbucketPageComponent)
    },
    {
        path: ':workbucketId/work-item/new',
        loadComponent: () => import("./pages/new-work-item-page/new-work-item-page.component").then(m => m.NewWorkItemPageComponent)
    },
    {
        path: '',
        pathMatch: 'full',
        canActivate: [async () => {
            const userId = inject(AuthService).userId();
            const firestore = inject(Firestore);
            const router = inject(Router);

            if (!userId) return false;

            const workbucketsCollection = collection(firestore, 'USER_DATA', userId, 'WORKBUCKETS');
            const docsRef = await getDocs(workbucketsCollection);
            
            console.log(docsRef.docs);

            if (docsRef.docs.length === 0) return true;
            else return router.createUrlTree(['/app', 'workbucket', docsRef.docs[0].id]);
        }],
        loadComponent: () => import("./pages/no-workbuckets-page/no-workbuckets-page.component").then(m => m.NoWorkbucketsPageComponent)
    }
]