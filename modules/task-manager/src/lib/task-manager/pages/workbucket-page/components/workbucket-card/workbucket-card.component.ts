import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workbucket } from '../../../../models/Workbucket';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'workbucket-card',
	standalone: true,
	imports: [CommonModule, MatCardModule, MatIconModule],
	templateUrl: './workbucket-card.component.html',
	styleUrls: ['./workbucket-card.component.scss'],
})
export class WorkbucketCardComponent {
	@Input({ required: true }) workbucket?: Workbucket;
	
}
