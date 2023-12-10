import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateWorkbucketPageComponent } from './create-workbucket-page.component';

describe('CreateWorkbucketPageComponent', () => {
	let component: CreateWorkbucketPageComponent;
	let fixture: ComponentFixture<CreateWorkbucketPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CreateWorkbucketPageComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CreateWorkbucketPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
