import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkItemCardComponent } from './work-item-card.component';

describe('WorkItemCardComponent', () => {
	let component: WorkItemCardComponent;
	let fixture: ComponentFixture<WorkItemCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [WorkItemCardComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(WorkItemCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
