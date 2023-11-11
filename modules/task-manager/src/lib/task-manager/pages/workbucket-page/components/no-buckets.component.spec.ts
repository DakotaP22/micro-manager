import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoBucketsComponent } from './no-buckets.component';

describe('NoBucketsComponent', () => {
  let component: NoBucketsComponent;
  let fixture: ComponentFixture<NoBucketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoBucketsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoBucketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
