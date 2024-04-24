import { Component, effect, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { WorkbucketService } from '../../../workbuckets/services/workbucket.service';
import { injectQueryParams } from 'ngxtension/inject-query-params';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-meeting',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  providers: [WorkbucketService, provideNativeDateAdapter()],
  templateUrl: './create-meeting.component.html',
  styleUrl: './create-meeting.component.scss',
})
export class CreateMeetingComponent {
  workbucketSvc = inject(WorkbucketService);
  private location = inject(Location);

  selectedWorkbucket = injectQueryParams('workbucket');

  workbuckets = injectQuery(() => ({
    queryKey: ['workbuckets', '1'],
    queryFn: ({ queryKey }) => this.workbucketSvc.getWorkbuckets(queryKey[1]),
  }));

  newMeetingForm = inject(FormBuilder).record({
    title: ['', [Validators.required]],
    workbucketId: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    // startTime: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    // endTime: ['', [Validators.required]],
  });

  constructor() {
    effect(() => {
      if (this.selectedWorkbucket() && !this.workbuckets.isLoading() && this.workbuckets.data()?.find((wb) => wb.id === this.selectedWorkbucket())){
        this.newMeetingForm
          .get('workbucketId')
          ?.setValue(this.selectedWorkbucket());
        this.newMeetingForm.get('workbucketId')?.disable();
      }
    });
  }

  navigateBack() {
    this.location.back();
  }
}
