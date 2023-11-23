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
import { WorkbucketCardListComponent } from './components/workbucket-card-list/workbucket-card-list.component';

@Component({
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		NoBucketsComponent,
		WorkbucketCardComponent,
		WorkbucketCardListComponent,
		ConfirmationDialogComponent,
		RouterModule,
	],
	providers: [WorkbucketsService, WorkbucketQueryService],
	templateUrl: './workbuckets-page.component.html',
	styleUrls: ['./workbuckets-page.component.scss'],
})
export class WorkbucketsPageComponent {
	dialogController = inject(MatDialog);
	router = inject(Router);

	selectedBucketId = injectParams('bucket-id');

	bucketsQuery = inject(WorkbucketQueryService);
	bucketsResult = this.bucketsQuery.getBuckets().result;

	buckets = computed(() => this.bucketsResult().data ?? []);
	bucketCount = computed(() => this.buckets().length);
	selectedBucket = computed(() =>
		this.buckets().find((b) => b.id === this.selectedBucketId())
	);
	isLoading = computed(() => this.bucketsResult().isLoading);

	routeToFirstBucketEffect = effect(() => {
		if (this.bucketCount() > 0 && !this.selectedBucketId()) {
			this.router.navigate(['/buckets', this.buckets()[0].id]);
		}
	});

	onCreateBucketClick() {
		const title = 'Test Bucket';
		const description = 'Test Description';
		this.bucketsQuery.addBucket().mutate({ title, description });
	}
}
