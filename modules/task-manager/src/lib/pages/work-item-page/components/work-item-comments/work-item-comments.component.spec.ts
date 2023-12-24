import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkItemCommentsComponent } from './work-item-comments.component';

describe('WorkItemCommentsComponent', () => {
	let component: WorkItemCommentsComponent;
	let fixture: ComponentFixture<WorkItemCommentsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [WorkItemCommentsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(WorkItemCommentsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
