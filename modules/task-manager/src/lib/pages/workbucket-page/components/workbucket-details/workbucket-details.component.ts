import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { WorkItemsService } from '../../../../data/work-items.service';
import { WorkbucketsService } from '../../../../data/workbuckets.service';
import { WorkItemsQueryService } from '../../../../queries/work-items.query';
import { WorkbucketQueryService } from '../../../../queries/workbuckets.query';
import { WorkItemCardComponent } from '../work-item-card/work-item-card.component';
import { Router } from '@angular/router';
import { WorkItemTableComponent } from '../work-item-table/work-item-table.component';



@Component({
	selector: 'workbucket-details',
	standalone: true,
	imports: [CommonModule, MatButtonModule, WorkItemCardComponent, WorkItemTableComponent],
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

	router = inject(Router);

	bucketsQuerySvc = inject(WorkbucketQueryService);
	workItemsQuerySvc = inject(WorkItemsQueryService);
	bucketQuery = this.bucketsQuerySvc.getBucketDetailsQuery(this.bucketIdSignal);
	workItemsQuery = this.workItemsQuerySvc.getWorkItemsQuery(this.bucketIdSignal);

	routeToCreateWorkItem() {
		this.router.navigate(['/buckets', this.bucketIdSignal(), 'work-items', 'create'])
	}
	
}
