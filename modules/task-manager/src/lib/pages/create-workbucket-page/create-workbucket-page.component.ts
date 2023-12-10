import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WorkbucketQueryService } from '../../queries/workbuckets.query';
import { WorkbucketsService } from '../../data/workbuckets.service';
import { Router } from '@angular/router';


@Component({
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
	providers: [WorkbucketQueryService, WorkbucketsService],
	templateUrl: './create-workbucket-page.component.html',
	styleUrls: ['./create-workbucket-page.component.scss'],
})
export class CreateWorkbucketPageComponent {
	workbucketQuerySvc = inject(WorkbucketQueryService);
	router = inject(Router);
	
	createBucketForm = inject(FormBuilder).group({
		title: ['', Validators.required],
		description: [''],
		allocation: [],
		priority: [],
	})

	onSubmit() {
		if(!this.createBucketForm.valid) return;

		const { title, description, allocation, priority } = this.createBucketForm.value;
		
		const bucket = {
			title: title ?? '',
			description,
			allocation,
			priority,
		};

		this.workbucketQuerySvc.addBucket().mutate(bucket, {
			onSuccess: () => {
				this.router.navigate(['/buckets']);
			}
		});
	}

	onCancel() {
		this.router.navigate(['/buckets']);
	}
	
}
