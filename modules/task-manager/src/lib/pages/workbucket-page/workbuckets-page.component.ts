import { CommonModule } from '@angular/common';
import {
	Component,
	inject
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Workbucket } from '../../models/Workbucket';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NoBucketsComponent } from './components/no-buckets/no-buckets.component';
import { WorkbucketCardComponent } from './components/workbucket-card/workbucket-card.component';
import { WorkbucketsPageService } from './workbuckets-page.service';
import { WorkbucketsService } from '../../services/workbuckets.service';
import { AuthService } from '@micromanager/auth';
import { RouterModule } from '@angular/router';

@Component({
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		NoBucketsComponent,
		WorkbucketCardComponent,
		ConfirmationDialogComponent,
	RouterModule
	],
	providers: [WorkbucketsPageService],
	templateUrl: './workbuckets-page.component.html',
	styleUrls: ['./workbuckets-page.component.scss'],
})
export class WorkbucketsPageComponent {
	pageSvc = inject(WorkbucketsPageService);
	workbucketSvc = inject(WorkbucketsService);
	authSvc = inject(AuthService);
	dialogController = inject(MatDialog);

	onCreateBucketClick() {
		console.log('TODO: Create Bucket!');
	}

	onDeleteBucket(bucketId: string) {
		console.log('Test!')
		this.dialogController.open(ConfirmationDialogComponent, {
			width: '400px',
			data: {
				action: 'Delete',
				description: 'Deleting buckets is irreversible. Do you want to delete this bucket?',
				warn: true,
			},
			enterAnimationDuration: '250ms',
			exitAnimationDuration: '100ms',
			autoFocus: 'dialog'
		}).afterClosed().subscribe((result) => {
			if (!result) {
				return
			}
			
			const userId = this.authSvc.state().user?.id;
			if (!userId) {
				return;
			}

			this.workbucketSvc.deleteBucket(userId, bucketId).then(() => {
				this.pageSvc.state.getBuckets();
			});	
		})
	}

	onArchiveBucket(bucketId: string) {
		this.dialogController.open(ConfirmationDialogComponent, {
			width: '400px',
			data: {
				action: 'Archive',
				description: 'Archiving buckets will hide them from most views. Do you want to archive this bucket?',
			},
			enterAnimationDuration: '250ms',
			exitAnimationDuration: '100ms',
			autoFocus: 'dialog'
		}).afterClosed().subscribe((result) => {
			if (!result) {
				return
			}
			
			const userId = this.authSvc.state().user?.id;
			if (!userId) {
				return;
			}

			this.workbucketSvc.archiveBucket(userId, bucketId).then(() => {
				this.pageSvc.state.getBuckets();
			});
		})
	}
	
}
