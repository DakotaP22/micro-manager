import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateWorkItemPageComponent } from './create-work-item-page.component';

describe('CreateWorkItemPageComponent', () => {
	let component: CreateWorkItemPageComponent;
	let fixture: ComponentFixture<CreateWorkItemPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CreateWorkItemPageComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CreateWorkItemPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
