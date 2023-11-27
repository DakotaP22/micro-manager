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
	imports: [
		CommonModule,
		WorkbucketCardComponent,
		RouterModule,
		ConfirmationDialogComponent,
	],
	templateUrl: './workbucket-card-list.component.html',
	styleUrls: ['./workbucket-card-list.component.scss'],
})
export class WorkbucketCardListComponent {
	dialogController = inject(MatDialog);
	router = inject(Router);

	bucketsQuery = inject(WorkbucketQueryService);
	bucketsResult = this.bucketsQuery.getBuckets().result;
	archiveBucket = this.bucketsQuery.archiveBucket();
	archiveBucketResult = this.archiveBucket.result;
	deleteBucket = this.bucketsQuery.deleteBucket();
	deleteBucketResult = this.deleteBucket.result;

	buckets = computed(() => this.bucketsResult().data ?? []);
	selectedBucketId = injectParams('bucket-id');

	onDeleteBucket(bucketId: string, bucketName: string) {
		console.log('Test!');
		this.dialogController
			.open(ConfirmationDialogComponent, {
				width: '400px',
				data: {
					action: 'Delete',
					description:
						`Deleting buckets is irreversible. Do you want to delete ${bucketName}?`,
					warn: true,
				},
				enterAnimationDuration: '250ms',
				exitAnimationDuration: '100ms',
				autoFocus: 'dialog',
			})
			.afterClosed()
			.subscribe(async (result) => {
				if (!result) {
					return;
				}

				this.deleteBucket.mutate({ bucketId }, {
					onSuccess: (_, { bucketId }) => {
						console.log(bucketId)
						if(this.selectedBucketId() === bucketId) {
							for (const bucket of this.buckets()) {
								if (bucket.id !== bucketId) {
									this.router.navigate(['/buckets', bucket.id]);
									return;
								}
							}
							this.router.navigate(['/buckets']);
						}
					}
				});
			});
	}

	onArchiveBucket(bucketId: string, bucketName: string) {
		this.dialogController
			.open(ConfirmationDialogComponent, {
				width: '400px',
				data: {
					action: 'Archive',
					description:
						`Archiving buckets will hide them from most views. Do you want to archive ${bucketName}?`,
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

				this.archiveBucket.mutate({bucketId}, {
					onSuccess: (_, {bucketId}) => {
						if(this.selectedBucketId() === bucketId) {
							for (const bucket of this.buckets()) {
								if (bucket.id !== bucketId) {
									this.router.navigate(['/buckets', bucket.id]);
									return;
								}
							}
							this.router.navigate(['/buckets']);
						}
					}
				});
			});
	}
}
