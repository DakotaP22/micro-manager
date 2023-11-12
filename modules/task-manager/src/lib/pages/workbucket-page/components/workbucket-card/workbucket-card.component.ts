import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workbucket } from '../../../../models/Workbucket';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
	selector: 'workbucket-card',
	standalone: true,
	imports: [CommonModule, MatCardModule, MatIconModule, MatMenuModule],
	providers: [],
	templateUrl: './workbucket-card.component.html',
	styleUrls: ['./workbucket-card.component.scss'],
})
export class WorkbucketCardComponent {
	@Input({ required: true }) workbucket?: Workbucket;
	@Output() edit = new EventEmitter<void>();
	@Output() archive = new EventEmitter<void>();
	@Output() delete = new EventEmitter<void>();
}
