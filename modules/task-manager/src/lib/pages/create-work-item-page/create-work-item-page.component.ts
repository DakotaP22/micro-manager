import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { Router } from '@angular/router';
import { WorkItemsService } from '../../data/work-items.service';
import { CreateFirebaseWorkItem, Priority } from '../../models/WorkItem';
import { WorkItemsQueryService } from '../../queries/work-items.query';
import { injectParams } from 'ngxtension/inject-params';

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
		externalTrackingId: new FormControl<string | null>(null, Validators.required),
		description: new FormControl<string | null>(null),
		notes: new FormControl<string | null>(null),
	});

	onSubmit() {
		if (!this.createBucketForm.valid || !this.bucketId()) return;
		
		const formValues = this.createBucketForm.value;

		const workItem: CreateFirebaseWorkItem = {
			title: formValues.title ?? '',
			priority: formValues.priority ?? 'Low',
			complexity: 'Low',
			dueDate: formValues.dueDate ? Timestamp.fromDate(formValues.dueDate) : Timestamp.now(),
			externalTrackingId: formValues.externalTrackingId ?? 'missing external reference!!',
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
