import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkItemOverviewComponent } from './work-item-overview.component';

describe('WorkItemOverviewComponent', () => {
	let component: WorkItemOverviewComponent;
	let fixture: ComponentFixture<WorkItemOverviewComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [WorkItemOverviewComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(WorkItemOverviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
