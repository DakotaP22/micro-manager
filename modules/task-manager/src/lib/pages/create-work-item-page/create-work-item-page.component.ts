import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { injectParams } from 'ngxtension/inject-params';
import { WorkItemsService } from '../../data/work-items.service';
import { Priority } from '../../models/WorkItem';
import { CreateWorkItemDTO } from '../../models/dto/WorkItem/CreateWorkItemDTO';
import { WorkItemsQueryService } from '../../queries/work-items.query';

@Component({
	selector: 'create-work-item-page',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSelectModule
	],
	providers: [WorkItemsQueryService, WorkItemsService],
	templateUrl: './create-work-item-page.component.html',
	styleUrls: ['./create-work-item-page.component.scss'],
})
export class CreateWorkItemPageComponent {
	workItemsQuerySvc = inject(WorkItemsQueryService);
	router = inject(Router);

	bucketId = injectParams('bucket-id');

	createBucketForm = inject(FormBuilder).group({
		title: new FormControl<string>('', Validators.required),
		priority: new FormControl<Priority | null>(null, Validators.required),
		dueDate: new FormControl<Date | null>(null, Validators.required),
		externalTrackingId: new FormControl<string | null>(null),
		description: new FormControl<string | null>(null),
		notes: new FormControl<string | null>(null),
	});

	onSubmit() {
		if (!this.createBucketForm.valid || !this.bucketId()) return;
		
		const formValues = this.createBucketForm.value;

		const workItem: CreateWorkItemDTO = {
			title: formValues.title ?? '',
			priority: formValues.priority ?? 'Low',
			complexity: 'Low',
			dueDate: formValues.dueDate ? Timestamp.fromDate(formValues.dueDate) : Timestamp.now(),
			externalTrackingId: formValues.externalTrackingId ?? '',
			description: formValues.description ?? '',
			notes: formValues.notes ?? '',
		};

		this.workItemsQuerySvc.addWorkItem().mutate(
			{ workbucketId: this.bucketId() ?? '', workItem },
			{
				onSuccess: () => {
					this.router.navigate(['/buckets']);
				},
			}
		);
	}

	onCancel() {
		this.router.navigate(['/buckets']);
	}
}
