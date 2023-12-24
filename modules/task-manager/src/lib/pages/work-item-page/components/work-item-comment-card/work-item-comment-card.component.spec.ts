import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkItemCommentCardComponent } from './work-item-comment-card.component';

describe('WorkItemCommentCardComponent', () => {
	let component: WorkItemCommentCardComponent;
	let fixture: ComponentFixture<WorkItemCommentCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [WorkItemCommentCardComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(WorkItemCommentCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
