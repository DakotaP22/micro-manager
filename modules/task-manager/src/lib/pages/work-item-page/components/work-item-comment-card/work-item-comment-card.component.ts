import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkItemComment } from '../../../../models/WorkItemComment';

@Component({
	selector: 'work-item-comment-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './work-item-comment-card.component.html',
	styleUrls: ['./work-item-comment-card.component.scss'],
})
export class WorkItemCommentCardComponent {
	@Input({ required: true }) comment?: WorkItemComment;
}
