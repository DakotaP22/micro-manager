import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkbucketCardComponent } from './workbucket-card.component';

describe('WorkbucketCardComponent', () => {
	let component: WorkbucketCardComponent;
	let fixture: ComponentFixture<WorkbucketCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [WorkbucketCardComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(WorkbucketCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
