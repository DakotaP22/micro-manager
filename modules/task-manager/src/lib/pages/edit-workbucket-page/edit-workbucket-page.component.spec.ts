import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditWorkbucketPageComponent } from './edit-workbucket-page.component';

describe('EditWorkbucketPageComponent', () => {
	let component: EditWorkbucketPageComponent;
	let fixture: ComponentFixture<EditWorkbucketPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EditWorkbucketPageComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(EditWorkbucketPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
