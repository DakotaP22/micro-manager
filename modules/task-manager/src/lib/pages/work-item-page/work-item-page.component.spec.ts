import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkItemPageComponent } from './work-item-page.component';

describe('WorkItemPageComponent', () => {
	let component: WorkItemPageComponent;
	let fixture: ComponentFixture<WorkItemPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [WorkItemPageComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(WorkItemPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
