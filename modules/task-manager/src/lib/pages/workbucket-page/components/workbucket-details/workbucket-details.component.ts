import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { WorkItemsQueryService } from '../../../../queries/work-items.query';
import { injectParams } from 'ngxtension/inject-params';
import { WorkbucketQueryService } from '../../../../queries/workbuckets.query';
import { WorkItemTableComponent } from '../work-item-table/work-item-table.component';



@Component({
	selector: 'workbucket-details',
	standalone: true,
	imports: [CommonModule, MatButtonModule, WorkItemTableComponent],
	providers: [WorkbucketQueryService, WorkItemsQueryService],
	templateUrl: './workbucket-details.component.html',
	styleUrls: ['./workbucket-details.component.scss'],
})
export class WorkbucketDetailsComponent {

	router = inject(Router);
	bucketId = injectParams('bucket-id');

	bucketsQuerySvc = inject(WorkbucketQueryService);
	workItemsQuerySvc = inject(WorkItemsQueryService);

	bucketQuery = this.bucketsQuerySvc.getBucketDetailsQuery(this.bucketId);
	workItemsQuery = this.workItemsQuerySvc.getWorkItemsQuery(this.bucketId);

	routeToCreateWorkItem() {
		this.router.navigate(['/buckets', this.bucketId(), 'work-items', 'create'])
	}
	
}
