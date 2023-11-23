import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { injectParams } from 'ngxtension/inject-params';
import { WorkbucketsService } from '../../data/workbuckets.service';
import { WorkbucketQueryService } from '../../queries/workbuckets.query';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NoBucketsComponent } from './components/no-buckets/no-buckets.component';
import { WorkbucketCardComponent } from './components/workbucket-card/workbucket-card.component';

@Component({
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		NoBucketsComponent,
		WorkbucketCardComponent,
		ConfirmationDialogComponent,
		RouterModule,
	],
	providers: [
		WorkbucketsService,
		WorkbucketQueryService,
	],
	templateUrl: './workbuckets-page.component.html',
	styleUrls: ['./workbuckets-page.component.scss'],
})
export class WorkbucketsPageComponent {
	dialogController = inject(MatDialog);
	router = inject(Router);

	selectedBucketId = injectParams('bucket-id');//toSignal(this.selectedBucketId$);

	bucketsQuery = inject(WorkbucketQueryService);
	bucketsResult = this.bucketsQuery.getBuckets().result;

	buckets = computed(() => this.bucketsResult().data ?? []);
	bucketCount = computed(() => this.buckets().length);
	selectedBucket = computed(() => this.buckets().find((b) => b.id === this.selectedBucketId()));
	isLoading = computed(() => this.bucketsResult().isLoading);

	routeToFirstBucketEffect = effect(() => {
		if (this.bucketCount() > 0 && !this.selectedBucketId()) {
			this.router.navigateByUrl(`/buckets/${this.buckets()[0].id}`);
		}
	});

	onCreateBucketClick() {
		const title = "Test Bucket";
		const description = "Test Description";
		this.bucketsQuery.addBucket().mutate({ title, description })
	}

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

				this.bucketsQuery.deleteBucket().mutate({ bucketId });
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

				this.bucketsQuery.archiveBucket().mutate({ bucketId });
				this.router.navigate(['/buckets']);
			});
	}
}
