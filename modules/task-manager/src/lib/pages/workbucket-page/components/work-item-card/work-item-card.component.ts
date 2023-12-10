import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkItem } from '../../../../models/WorkItem';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
	selector: 'work-item-card',
	standalone: true,
	imports: [CommonModule, MatIconModule, MatMenuModule],
	templateUrl: './work-item-card.component.html',
	styleUrls: ['./work-item-card.component.scss'],
})
export class WorkItemCardComponent {
	@Input({required: true}) workItem?: WorkItem;
}
