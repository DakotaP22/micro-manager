import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { injectParams } from 'ngxtension/inject-params';
import { WorkItem } from '../../../../../lib/models/WorkItem';
import { WorkItemsService } from '../../../../data/work-items.service';
import { WorkItemsQueryService } from '../../../../queries/work-items.query';

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
	@Output() workItemClicked = new EventEmitter<string>();

	@Input()
	set workItems(items: WorkItem[]) {
		this._workItems.set(items);
	}
	_workItems = signal<WorkItem[]>([]);

	bucketId = injectParams('bucket-id');
	sortState = signal<Sort | null>(null);

	displayedColumns = ['title', 'complexity', 'priority', 'dueDate'];

	sortedWorkItems = computed(() => {
		const sort = this.sortState();
		const data = this._workItems();
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

	onWorkItemClick(data: WorkItem) {
		if (!data) {
			return;
		}
		this.workItemClicked.emit(data.id);
	}
}
