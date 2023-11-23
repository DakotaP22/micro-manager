import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { WorkbucketQueryService } from '../../../../queries/workbuckets.query';
import { injectParams } from 'ngxtension/inject-params';
import { WorkbucketCardComponent } from '../workbucket-card/workbucket-card.component';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'workbucket-card-list',
	standalone: true,
	imports: [CommonModule, WorkbucketCardComponent, RouterModule, ConfirmationDialogComponent],
	templateUrl: './workbucket-card-list.component.html',
	styleUrls: ['./workbucket-card-list.component.scss'],
})
export class WorkbucketCardListComponent {
	dialogController = inject(MatDialog);
	router = inject(Router);


	
	bucketsQuery = inject(WorkbucketQueryService);
	bucketsResult = this.bucketsQuery.getBuckets().result;
	
	buckets = computed(() => this.bucketsResult().data ?? []);
	selectedBucketId = injectParams('bucket-id');


	// bucketDeleted = this.bucketsQuery.deleteBucket().result;
	// bucketArchived = this.bucketsQuery.archiveBucket().result;



	onDeleteBucket(bucketId: string) {
		console.log('Test!');
		this.dialogController
			.open(ConfirmationDialogComponent, {
				width: '400px',
				data: {
					action: 'Delete',
					description:
						'Deleting buckets is irreversible. Do you want to delete this bucket?',
					warn: true,
				},
				enterAnimationDuration: '250ms',
				exitAnimationDuration: '100ms',
				autoFocus: 'dialog',
			})
			.afterClosed()
			.subscribe((result) => {
				if (!result) {
					return;
				}

				this.bucketsQuery.deleteBucket().mutate(bucketId);
				this.router.navigate(['/buckets']);
			});
	}

	onArchiveBucket(bucketId: string) {
		this.dialogController
			.open(ConfirmationDialogComponent, {
				width: '400px',
				data: {
					action: 'Archive',
					description:
						'Archiving buckets will hide them from most views. Do you want to archive this bucket?',
				},
				enterAnimationDuration: '250ms',
				exitAnimationDuration: '100ms',
				autoFocus: 'dialog',
			})
			.afterClosed()
			.subscribe((result) => {
				if (!result) {
					return;
				}

				this.bucketsQuery.archiveBucket().mutate(bucketId);
				this.router.navigate(['/buckets']);
			});
	}

}
