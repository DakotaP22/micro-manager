import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkbucketDetailsComponent } from './workbucket-details.component';

describe('WorkbucketDetailsComponent', () => {
	let component: WorkbucketDetailsComponent;
	let fixture: ComponentFixture<WorkbucketDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [WorkbucketDetailsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(WorkbucketDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
