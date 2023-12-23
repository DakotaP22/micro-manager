import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
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
import { WorkItemsService } from '../../data/work-items.service';

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
	bucketQuerySvc = inject(WorkbucketQueryService);
	bucketQuery = this.bucketQuerySvc.getBucketsQuery();
	bucketCount = computed(() => this.bucketQuery.data()?.length ?? 0);


	
	navigateToCreateBucketPage() {
		this.router.navigate(['/buckets', 'create']);
	}
}
