import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkbucketSelectComponent } from './workbucket-select.component';

describe('WorkbucketSelectComponent', () => {
  let component: WorkbucketSelectComponent;
  let fixture: ComponentFixture<WorkbucketSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkbucketSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkbucketSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
