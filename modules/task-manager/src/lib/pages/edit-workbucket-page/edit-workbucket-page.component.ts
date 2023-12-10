import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WorkbucketQueryService } from '../../queries/workbuckets.query';
import { WorkbucketsService } from '../../data/workbuckets.service';
import { Router } from '@angular/router';
import { injectParams } from 'ngxtension/inject-params';
import { Workbucket } from '../../models/Workbucket';


@Component({
	standalone: true,
	selector: 'edit-workbucket-page',
	imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
	providers: [WorkbucketQueryService, WorkbucketsService],
	templateUrl: './edit-workbucket-page.component.html',
	styleUrls: ['./edit-workbucket-page.component.scss'],
})
export class EditWorkbucketPageComponent {
	router = inject(Router);
	workbucketQuerySvc = inject(WorkbucketQueryService);

	bucketId = injectParams('bucket-id');
	workbucketQuery = this.workbucketQuerySvc.getBucketDetailsQuery(this.bucketId);
	
	createBucketForm = inject(FormBuilder).group({
		id: ['', Validators.required],
		title: ['', Validators.required],
		description: [''],
		allocation: [0],
		priority: [0],
	})

	constructor() {
		effect(() => {
			const workbucket: Workbucket | null | undefined = this.workbucketQuery.data();
			this.createBucketForm.patchValue({
				id: workbucket?.id,
				title: this.workbucketQuery.data()?.title,
				description: this.workbucketQuery.data()?.description,
				allocation: this.workbucketQuery.data()?.allocation,
				priority: this.workbucketQuery.data()?.priority,
			})
		})
	}

	onSubmit() {
		if(!this.createBucketForm.valid) return;

		const { id, title, description, allocation, priority } = this.createBucketForm.value;
		
		const bucket = {
			bucketId: id ?? '',
			title: title ?? '',
			description,
			allocation,
			priority,
		};

		this.workbucketQuerySvc.updateBucket().mutate(bucket, {
			onSuccess: () => {
				this.router.navigate(['/buckets']);
			}
		});
	}

	onCancel() {
		this.router.navigate(['/buckets']);
	}
	
}
