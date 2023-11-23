import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkbucketCardListComponent } from './workbucket-card-list.component';

describe('WorkbucketCardListComponent', () => {
	let component: WorkbucketCardListComponent;
	let fixture: ComponentFixture<WorkbucketCardListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [WorkbucketCardListComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(WorkbucketCardListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
