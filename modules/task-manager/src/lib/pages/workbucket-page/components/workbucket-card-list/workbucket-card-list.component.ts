import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { injectParams } from 'ngxtension/inject-params';
import { signalSlice } from 'ngxtension/signal-slice';
import { map } from 'rxjs';
import { Workbucket } from '../../../../models/Workbucket';
import { WorkbucketQueryService } from '../../../../queries/workbuckets.query';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { WorkbucketCardComponent } from '../workbucket-card/workbucket-card.component';

type ComponentState = {
	data: Workbucket[];
	selectedBucketId: string | null;
	isLoading: boolean;
	isFetching: boolean;
	isError: boolean;
};

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
	bucketsQuerySvc = inject(WorkbucketQueryService);
	bucketsQuery = this.bucketsQuerySvc.getBucketsQuery();

	buckets$ = toObservable(this.bucketsQuery.data).pipe(
		map((data) => ({ data: data ?? [] }))
	);
	selectedBucketId$ = toObservable(injectParams('bucket-id')).pipe(
		map((bucketId) => ({ selectedBucketId: bucketId }))
	);
	isLoading$ = toObservable(this.bucketsQuery.isLoading).pipe(
		map((isLoading) => ({ isLoading }))
	);
	isFetching$ = toObservable(this.bucketsQuery.isFetching).pipe(
		map((isFetching) => ({ isFetching }))
	);
	isError$ = toObservable(this.bucketsQuery.isError).pipe(
		map((isError) => ({ isError }))
	);

	state = signalSlice({
		initialState: {
			data: [],
			selectedBucketId: null,
			isLoading: false,
			isFetching: false,
			isError: false,
		} as ComponentState,
		sources: [
			this.selectedBucketId$,
			this.buckets$,
			this.isLoading$,
			this.isFetching$,
			this.isError$,
		],
	});

	onDeleteBucket(bucketId: string, bucketName: string) {
		this.dialogController
			.open(ConfirmationDialogComponent, {
				width: '400px',
				data: {
					action: 'Delete',
					description: `Deleting buckets is irreversible. Do you want to delete ${bucketName}?`,
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

				this.bucketsQuerySvc.deleteBucket().mutate(bucketId, {
					onSuccess: (_, bucketId) =>
						this.navigateAfterDeleteOrArchive(bucketId),
				});
			});
	}

	onArchiveBucket(bucketId: string, bucketName: string) {
		this.dialogController
			.open(ConfirmationDialogComponent, {
				width: '400px',
				data: {
					action: 'Archive',
					description: `Archiving buckets will hide them from most views. Do you want to archive ${bucketName}?`,
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

				this.bucketsQuerySvc.archiveBucket().mutate(bucketId, {
					onSuccess: (_, bucketId) =>
						this.navigateAfterDeleteOrArchive(bucketId),
				});
			});
	}

	private navigateAfterDeleteOrArchive(bucketId: string) {
		if (this.state.selectedBucketId() === bucketId) {
			for (const bucket of this.state.data()) {
				if (bucket.id !== bucketId) {
					this.router.navigate(['/buckets', bucket.id]);
					return;
				}
			}
			this.router.navigate(['/buckets']);
		}
	}
}
