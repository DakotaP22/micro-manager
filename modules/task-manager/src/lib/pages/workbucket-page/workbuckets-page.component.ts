import { CommonModule } from '@angular/common';
import {
	Component,
	inject
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Workbucket } from '../../models/Workbucket';
import { NoBucketsComponent } from './components/no-buckets/no-buckets.component';
import { WorkbucketCardComponent } from './components/workbucket-card/workbucket-card.component';
import { WorkbucketsPageService } from './workbuckets-page.service';

@Component({
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		NoBucketsComponent,
		WorkbucketCardComponent,
	],
	providers: [WorkbucketsPageService],
	templateUrl: './workbuckets-page.component.html',
	styleUrls: ['./workbuckets-page.component.scss'],
})
export class WorkbucketsPageComponent {
	pageSvc = inject(WorkbucketsPageService);

	onCreateBucketClick() {
		console.log('TODO: Create Bucket!');
	}

	onBucketClick(bucket: Workbucket) {
		this.pageSvc.state.selectWorkbucket(bucket.id);
	}
	
}
