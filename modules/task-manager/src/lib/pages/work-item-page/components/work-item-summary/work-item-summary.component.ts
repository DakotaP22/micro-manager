import { Component, Input, Signal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Complexity, Priority } from '../../../../models/WorkItem';
import { MatButtonModule } from '@angular/material/button';

export type WorkItemSummary = {
	description: string;
	externalTrackingId: string;
	priority: Priority | string;
	complexity: Complexity | string;
	dueDate?: number;
}

const defaultSummary: WorkItemSummary = {
	description: 'No Description',
	externalTrackingId: 'No External Tracking Id',
	priority: 'Priority Not Set',
	complexity: 'Unknown',
	dueDate: undefined
}

@Component({
	selector: 'work-item-summary',
	standalone: true,
	imports: [CommonModule, MatButtonModule],
	templateUrl: './work-item-summary.component.html',
	styleUrls: ['./work-item-summary.component.scss'],
})
export class WorkItemSummaryComponent {
	@Input()
	set data(value: WorkItemSummary) {
		this.workItemSummary.set(value);
	}
	workItemSummary = signal<WorkItemSummary>(defaultSummary);

	description = computed(() => this.workItemSummary().description);
	externalTrackingId = computed(() => {
		if (this.workItemSummary().externalTrackingId.length === 0) {
			return 'No External Tracking Id';
		}
		return this.workItemSummary().externalTrackingId
	});
	priority = computed(() => this.workItemSummary().priority);
	complexity = computed(() => this.workItemSummary().complexity);
	dueDate = computed(() => this.workItemSummary().dueDate);
}
