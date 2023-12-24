import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { injectParams } from 'ngxtension/inject-params';
import { WorkbucketQueryService } from '../../../../queries/workbuckets.query';
import { WorkItemCardComponent } from '../work-item-card/work-item-card.component';
import { WorkItemTableComponent } from '../work-item-table/work-item-table.component';



@Component({
	selector: 'workbucket-details',
	standalone: true,
	imports: [CommonModule, MatButtonModule, WorkItemCardComponent, WorkItemTableComponent],
	providers: [WorkbucketQueryService],
	templateUrl: './workbucket-details.component.html',
	styleUrls: ['./workbucket-details.component.scss'],
})
export class WorkbucketDetailsComponent {

	router = inject(Router);
	bucketId = injectParams('bucket-id');

	bucketsQuerySvc = inject(WorkbucketQueryService);
	bucketQuery = this.bucketsQuerySvc.getBucketDetailsQuery(this.bucketId);

	routeToCreateWorkItem() {
		this.router.navigate(['/buckets', this.bucketId(), 'work-items', 'create'])
	}
	
}
