import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Priority, WorkItem } from '../../../../models/WorkItem';

export type WorkItemUpdate = {
	title: string;
	priority: Priority;
	dueDate: Date;
	externalTrackingId: string;
	description: string;
}

@Component({
	selector: 'work-item-overview',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSelectModule,
	],
	templateUrl: './work-item-overview.component.html',
	styleUrls: ['./work-item-overview.component.scss'],
})
export class WorkItemOverviewComponent {
	@Input()
	set data(value: WorkItem) {
		this.workItem.set(value);
	}
	workItem = signal<WorkItem>({} as WorkItem); // TODO: add initial state

	@Output() updateItem = new EventEmitter<WorkItemUpdate>();


	updateBucketForm = inject(FormBuilder).group({
		title: new FormControl<string>('', Validators.required),
		priority: new FormControl<Priority | null>(null, Validators.required),
		dueDate: new FormControl<Date | null>(null, Validators.required),
		externalTrackingId: new FormControl<string>(''),
		description: new FormControl<string>(''),
	});

	constructor() {
		effect(() => {
			const {
				title,
				priority,
				dueDate,
				externalTrackingId,
				description,
			} = this.workItem();

			this.updateBucketForm.patchValue({
				title,
				priority,
				dueDate: new Date(dueDate),
				externalTrackingId,
				description,
			});

		})
	}

	onSubmit() {
		if (!this.updateBucketForm.valid) return;

		const formValues = this.updateBucketForm.value;

		const workItem: WorkItemUpdate = {
			...formValues
		} as WorkItemUpdate;

		this.updateItem.emit(workItem);		
	}
}
