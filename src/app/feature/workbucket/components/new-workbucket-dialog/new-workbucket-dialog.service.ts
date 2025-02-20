import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { Workbucket } from '../../models/Workbucket';
import { NewWorkbucketDialogComponent } from './new-workbucket-dialog.component';

@Injectable()
export class NewWorkbucketDialogService {
    dialog = inject(MatDialog);

    async openDialog(workbuckets: Workbucket[]) {
        const dialogRef = this.dialog.open(NewWorkbucketDialogComponent, {
            data: { workbuckets },
        });

        return lastValueFrom(dialogRef.afterClosed().pipe());
    }
    
}