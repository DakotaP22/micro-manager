import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WorkItemComment } from '../../../../models/WorkItemComment';
import { WorkItemCommentCardComponent } from '../work-item-comment-card/work-item-comment-card.component';

@Component({
	selector: 'work-item-comments',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, WorkItemCommentCardComponent],
	templateUrl: './work-item-comments.component.html',
	styleUrls: ['./work-item-comments.component.scss'],
})
export class WorkItemCommentsComponent {
	@Input()
	set comments(comments: WorkItemComment[]) { 
		this.commentList.set(comments.sort((a, b) => b.timestamp - a.timestamp));
	}
	commentList = signal<WorkItemComment[]>([]);

	@Output()
	addComment = new EventEmitter<string>();

	commentForm = inject(FormBuilder).group({
		comment: ['', Validators.required]
	});

	onAddCommentClick() {
		const { comment } = this.commentForm.value;

		if (!comment) {
			return;
		}
		this.commentForm.reset();
		this.addComment.emit(comment);
	}
}
