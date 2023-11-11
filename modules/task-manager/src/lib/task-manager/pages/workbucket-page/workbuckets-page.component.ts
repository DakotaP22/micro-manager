import { CommonModule } from '@angular/common';
import {
	Component,
	Signal,
	WritableSignal,
	computed,
	signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Workbucket } from '../../models/Workbucket';
import { NoBucketsComponent } from './components/no-buckets/no-buckets.component';
import { WorkbucketCardComponent } from './components/workbucket-card/workbucket-card.component';

@Component({
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		NoBucketsComponent,
		WorkbucketCardComponent,
	],
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
			openItems: 0,
		} as Workbucket,
		{
			id: '2',
			title: 'My Workbucket',
			description: 'This is my workbucket',
			items: [],
			openItems: 1,
		} as Workbucket,
		{
			id: '3',
			title: 'My Workbucket',
			description: 'This is my workbucket',
			items: [],
			openItems: 2,
		} as Workbucket,
	]).asReadonly();
	bucketCount = computed(() => this.buckets().length);
	selectedWorkbucket: WritableSignal<Workbucket | null> = signal(null);

	onCreateBucketClick() {
		console.log('TODO: Create Bucket!');
	}

	onBucketClick(bucket: Workbucket) {
		this.selectedWorkbucket.set(bucket);
	}
	
}
