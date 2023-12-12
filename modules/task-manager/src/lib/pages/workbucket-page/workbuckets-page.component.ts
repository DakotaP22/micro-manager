import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { injectParams } from 'ngxtension/inject-params';
import { signalSlice } from 'ngxtension/signal-slice';
import { map } from 'rxjs';
import { WorkbucketsService } from '../../data/workbuckets.service';
import { Workbucket } from '../../models/Workbucket';
import { WorkbucketQueryService } from '../../queries/workbuckets.query';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NoBucketsComponent } from './components/no-buckets/no-buckets.component';
import { WorkbucketCardListComponent } from './components/workbucket-card-list/workbucket-card-list.component';
import { WorkbucketCardComponent } from './components/workbucket-card/workbucket-card.component';
import { WorkbucketDetailsComponent } from './components/workbucket-details/workbucket-details.component';

type PageState = {
	data: Workbucket[];
	selectedBucketId: string | null;
	isLoading: boolean;
	isFetching: boolean;
	isError: boolean;
}

@Component({
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		NoBucketsComponent,
		WorkbucketCardComponent,
		WorkbucketCardListComponent,
		ConfirmationDialogComponent,
		WorkbucketDetailsComponent,
		RouterModule,
	],
	providers: [WorkbucketsService, WorkbucketQueryService],
	templateUrl: './workbuckets-page.component.html',
	styleUrls: ['./workbuckets-page.component.scss'],
})
export class WorkbucketsPageComponent {
	dialogController = inject(MatDialog);
	router = inject(Router);
	bucketsQuerySvc = inject(WorkbucketQueryService);
	bucketsQuery = this.bucketsQuerySvc.getBucketsQuery();

	selectedBucketId$ = toObservable(injectParams('bucket-id')).pipe(map((bucketId) => ({ selectedBucketId: bucketId })));
	buckets$ = toObservable(this.bucketsQuery.data).pipe(map((data) => ({ data: data ?? [] })));
	isLoading$ = toObservable(this.bucketsQuery.isLoading).pipe(map((isLoading) => ({ isLoading })));
	isFetching$ = toObservable(this.bucketsQuery.isFetching).pipe(map((isFetching) => ({ isFetching })));
	isError$ = toObservable(this.bucketsQuery.isError).pipe(map((isError) => ({ isError })));

	state = signalSlice({
		initialState: {
			data: [],
			selectedBucketId: null,
			isLoading: false,
			isFetching: false,
			isError: false,
		} as PageState,
		sources: [this.selectedBucketId$, this.buckets$, this.isLoading$, this.isFetching$, this.isError$],
		selectors: (state) => ({
			bucketCount: () => state().data.length,
			selectedBucket: () => state().data.find((b) => b.id === state().selectedBucketId),
			isSettled: () => !state().isLoading,
		}),
		effects: (state) => ({
			routetoFirstBucket: () => {
				if (
					state.isSettled() &&
					state.bucketCount() > 0 &&
					!state.selectedBucketId()
				) {
					this.router.navigate(['/buckets', state.data()[0].id]);
				} else if (
					state.isSettled() &&
					state.bucketCount() === 0 &&
					state.selectedBucketId()
				) {
					this.router.navigate(['/buckets']);
				}
			}
		})
	})

	navigateToCreateBucketPage() {
		this.router.navigate(['/buckets', 'create']);
	}
}
