import { Component, Input, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableModule } from '@angular/material/table';
import { WorkItemsQueryService } from '../../../../queries/work-items.query';
import { WorkItemsService } from '../../../../data/work-items.service';
import { Sort, MatSortModule } from '@angular/material/sort';

@Component({
	selector: 'work-item-table',
	standalone: true,
	imports: [CommonModule, MatTableModule, MatSortModule],
	providers: [WorkItemsQueryService, WorkItemsService],
	templateUrl: './work-item-table.component.html',
	styleUrls: ['./work-item-table.component.scss'],
})
export class WorkItemTableComponent {
	@ViewChild(MatTable) table!: MatTable<any>;

	@Input()
	set bucketId(value: string | null) {
		this.bucketIdSignal.set(value);
	}
	bucketIdSignal = signal<string | null>(null);
	sortState = signal<Sort | null>(null);

	workItemQuerySvc = inject(WorkItemsQueryService);
	workItemQuery = this.workItemQuerySvc.getWorkItemsQuery(this.bucketIdSignal);

	displayedColumns = ['title', 'complexity', 'priority', 'dueDate'];
	workItems = computed(() => this.workItemQuery.data());

	logWorkItems = effect(() => console.table(this.workItems()));
	logData = effect(() => console.table(this.workItemQuery.data()));

	sortedWorkItems = computed(() => {
		const sort = this.sortState();
		const data = this.workItems();
		if (!sort?.active || sort?.direction === '') {
			return data ? [...data] : [];
		}

		const sortedData = data?.sort((a, b) => {
			const isAsc = sort.direction === 'asc';
			switch (sort.active) {
				case 'title':
					return this.compare(a.title, b.title, isAsc);
				case 'complexity':
					return this.compareComplexity(a.complexity, b.complexity, isAsc);
				case 'priority':
					return this.comparePriority(a.priority, b.priority, isAsc);
				case 'dueDate':
					return this.compare(a.dueDate, b.dueDate, isAsc);
				default:
					return 0;
			}
		});

		return sortedData ? [...sortedData] : [];
	});

	private compare(a: string | number, b: string | number, isAsc: boolean) {
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}

	private comparePriority(a: string, b: string, isAsc: boolean) {
		return (this.convertPriorityToNumber(b) < this.convertPriorityToNumber(a) ? -1 : 1) * (isAsc ? 1 : -1);
	}

	private compareComplexity(a: string, b: string, isAsc: boolean) {
		return (this.convertComplexityToNumber(b) < this.convertComplexityToNumber(a) ? -1 : 1) * (isAsc ? 1 : -1);
	}

	private convertPriorityToNumber(priority: string) {
		switch (priority.toLocaleLowerCase()) {
			case 'low':
				return 0;
			case 'medium':
				return 1;
			case 'high':
				return 2;
			case 'critical':
				return 3;
			default:
				return 0;
		}
	}

	private convertComplexityToNumber(complexity: string) {
		switch (complexity.toLocaleLowerCase()) {
			case 'low':
				return 0;
			case 'medium':
				return 1;
			case 'high':
				return 2;
			default:
				return 0;
		}
	}

	onSortChange(sort: Sort) {
		this.sortState.set(sort);
	}

	constructor() {
		effect(() => {
			this.sortedWorkItems();
			this.table?.renderRows();
		})
	}
}
