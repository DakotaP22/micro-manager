import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { WorkbucketQueryService } from '../../../../queries/workbuckets.query';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Workbucket } from '../../../../models/Workbucket';
import { signalSlice } from 'ngxtension/signal-slice';
import { MatButtonModule } from '@angular/material/button';
import { WorkItemCardComponent } from '../work-item-card/work-item-card.component';
import { WorkItem } from '../../../../models/WorkItem';
import { WorkItemsQueryService } from '../../../../queries/work-items.query';
import { WorkbucketsService } from '../../../../data/workbuckets.service';
import { WorkItemsService } from '../../../../data/work-items.service';

type ComponentState = {
	workbucket: Workbucket | null;
	workbucketError: boolean;
	workbucketFetching: boolean;
	workbucketLoading: boolean;
	workItems: WorkItem[] | null;
	workItemsError: boolean;
	workItemsFetching: boolean;
	workItemsLoading: boolean;
};

const initialState: ComponentState = {
	workbucket: null,
	workItems: null,
	workbucketError: false,
	workbucketFetching: false,
	workbucketLoading: false,
	workItemsError: false,
	workItemsFetching: false,
	workItemsLoading: false,
};

@Component({
	selector: 'workbucket-details',
	standalone: true,
	imports: [CommonModule, MatButtonModule, WorkItemCardComponent],
	providers: [WorkbucketQueryService, WorkItemsQueryService, WorkbucketsService, WorkItemsService],
	templateUrl: './workbucket-details.component.html',
	styleUrls: ['./workbucket-details.component.scss'],
})
export class WorkbucketDetailsComponent {
	@Input({ required: true })
	set bucketId(value: string | null) {
		this.bucketIdSignal.set(value);
	}
	bucketIdSignal = signal<string | null>(null);

	bucketsQuerySvc = inject(WorkbucketQueryService);
	workItemsQuerySvc = inject(WorkItemsQueryService);
	bucketQuery = this.bucketsQuerySvc.getBucketDetailsQuery(this.bucketIdSignal);
	workItemsQuery = this.workItemsQuerySvc.getWorkItemsQuery(this.bucketIdSignal);

	
}
