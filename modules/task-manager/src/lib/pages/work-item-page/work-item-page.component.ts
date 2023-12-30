import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatTabsModule } from '@angular/material/tabs';
import { injectParams } from 'ngxtension/inject-params';
import { UpdateWorkItemDTO } from '../../models/dto/WorkItem/UpdateWorkItemDTO';
import { WorkItemCommentsQueryService } from '../../queries/work-item-comments.query';
import { WorkItemsQueryService } from '../../queries/work-items.query';
import { WorkItemCommentsComponent } from './components/work-item-comments/work-item-comments.component';
import { WorkItemOverviewComponent, WorkItemUpdate } from './components/work-item-overview/work-item-overview.component';

@Component({
	selector: 'workitem-page',
	standalone: true,
	imports: [CommonModule, MatTabsModule, WorkItemOverviewComponent, WorkItemCommentsComponent],
	providers: [WorkItemsQueryService, WorkItemCommentsQueryService],
	templateUrl: './work-item-page.component.html',
	styleUrls: ['./work-item-page.component.scss'],
})
export class WorkItemPageComponent {

	bucketId = injectParams('bucket-id');
	workItemId = injectParams('work-item-id');

	workItemQuerySvc = inject(WorkItemsQueryService);
	workItemCommentsQuerySvc = inject(WorkItemCommentsQueryService);
	workItemQuery = this.workItemQuerySvc.getWorkItemQuery(this.bucketId, this.workItemId);
	workItemCommentsQuery = this.workItemCommentsQuerySvc.getWorkItemCommentsQuery(this.bucketId, this.workItemId);

	workItem = computed(() => this.workItemQuery.data());
	workItemComments = computed(() => this.workItemCommentsQuery.data() ?? []);


	onAddComment(comment: string) {
		console.table({
			bucketId: this.bucketId(),
			workItemId: this.workItemId(),
			comment
		})
		this.workItemCommentsQuerySvc.addComment().mutate({
			workbucketId: this.bucketId(),
			workItemId: this.workItemId(),
			comment
		});
	}


	updateWorkItem(workItemUpdate: WorkItemUpdate) {

		console.log(workItemUpdate);

		const workItemUpdateDTO = {
			...workItemUpdate,
			dueDate: Timestamp.fromDate(workItemUpdate.dueDate)
		} as UpdateWorkItemDTO;

		console.log(workItemUpdateDTO);
		this.workItemQuerySvc.updateWorkItem().mutate({
			workbucketId: this.bucketId(),
			workItemId: this.workItemId(),
			workItem: workItemUpdateDTO
		});
	}

}
