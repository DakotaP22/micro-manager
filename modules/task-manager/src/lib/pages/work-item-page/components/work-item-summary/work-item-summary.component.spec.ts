import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkItemSummaryComponent } from './work-item-summary.component';

describe('WorkItemSummaryComponent', () => {
	let component: WorkItemSummaryComponent;
	let fixture: ComponentFixture<WorkItemSummaryComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [WorkItemSummaryComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(WorkItemSummaryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
