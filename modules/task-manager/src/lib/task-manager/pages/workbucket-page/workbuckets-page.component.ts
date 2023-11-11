import { CommonModule } from '@angular/common';
import { Component, Signal, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Workbucket } from '../../models/Workbucket';
import { NoBucketsComponent } from './components/no-buckets.component';

@Component({
	standalone: true,
	imports: [CommonModule, MatButtonModule, NoBucketsComponent],
	templateUrl: './workbuckets-page.component.html',
	styleUrls: ['./workbuckets-page.component.scss'],
})
export class WorkbucketsPageComponent {
	// buckets: Signal<Workbucket[]> = signal([]).asReadonly();

	buckets: Signal<Workbucket[]> = signal([
		{
			id: '1',
			title: 'My Workbucket',
			description: 'This is my workbucket',
			items: [],
		} as Workbucket,
	]).asReadonly();
	bucketCount = computed(() => this.buckets().length);
	
  
  
  onCreateBucketClick() {
		console.log('TODO: Create Bucket!');
	}
}
 
