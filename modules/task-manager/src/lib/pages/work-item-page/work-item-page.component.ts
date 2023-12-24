import { Component, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkItemsQueryService } from '../../queries/work-items.query';
import { injectParams } from 'ngxtension/inject-params';
import {MatTabsModule} from '@angular/material/tabs';
import { WorkItemSummary, WorkItemSummaryComponent } from './components/work-item-summary/work-item-summary.component';

@Component({
	selector: 'workitem-page',
	standalone: true,
	imports: [CommonModule, MatTabsModule, WorkItemSummaryComponent],
	providers: [WorkItemsQueryService],
	templateUrl: './work-item-page.component.html',
	styleUrls: ['./work-item-page.component.scss'],
})
export class WorkItemPageComponent {

	bucketId = injectParams('bucket-id');
	workItemId = injectParams('work-item-id');

	workItemQuerySvc = inject(WorkItemsQueryService);
	workItemQuery = this.workItemQuerySvc.getWorkItemQuery(this.bucketId, this.workItemId);

	workItem = computed(() => this.workItemQuery.data());
	workItemSummary: Signal<WorkItemSummary> = computed(() => ({
		description: this.workItem()?.description ?? 'No Description',
		externalTrackingId: this.workItem()?.externalTrackingId ?? 'No External Tracking Id',
		priority: this.workItem()?.priority ?? 'Priority Not Set',
		complexity: this.workItem()?.complexity ?? 'Unknown',
		dueDate: this.workItem()?.dueDate ?? undefined

	}))

}
