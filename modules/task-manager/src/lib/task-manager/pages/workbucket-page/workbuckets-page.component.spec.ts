import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkbucketsPageComponent } from './workbuckets-page.component';

describe('WorkbucketsPageComponent', () => {
  let component: WorkbucketsPageComponent;
  let fixture: ComponentFixture<WorkbucketsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkbucketsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkbucketsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
