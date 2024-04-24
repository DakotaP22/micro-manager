import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
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
import {
  TimepickerComponent,
  TimepickerHours,
  TimepickerMinutes,
  TimepickerTime,
} from '../../components/timepicker/timepicker.component';

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
    TimepickerComponent,
  ],
  providers: [WorkbucketService, provideNativeDateAdapter()],
  templateUrl: './create-meeting.component.html',
  styleUrl: './create-meeting.component.scss',
})
export class CreateMeetingComponent {
  workbucketSvc = inject(WorkbucketService);
  private location = inject(Location);

  titleInput = viewChild<ElementRef>('titleInput');

  selectedWorkbucket = injectQueryParams('workbucket');

  workbuckets = injectQuery(() => ({
    queryKey: ['workbuckets', '1'],
    queryFn: ({ queryKey }) => this.workbucketSvc.getWorkbuckets(queryKey[1]),
  }));

  newMeetingForm = inject(FormBuilder).record({
    title: ['', [Validators.required]],
    workbucketId: ['', [Validators.required]],
    startDate: [new Date(), [Validators.required]],
    startTime: [this.getClosestStartTime(), [Validators.required]],
    endDate: [new Date(), [Validators.required]],
    endTime: [this.getClosestEndTime(), [Validators.required]],
  });

  constructor() {
    effect(() => {
      if (
        this.selectedWorkbucket() &&
        !this.workbuckets.isLoading() &&
        this.workbuckets
          .data()
          ?.find((wb) => wb.id === this.selectedWorkbucket())
      ) {
        this.newMeetingForm
          .get('workbucketId')
          ?.setValue(this.selectedWorkbucket());
        this.newMeetingForm.get('workbucketId')?.disable();
      }
    });

    effect(() => {
      this.titleInput()?.nativeElement?.focus();
    })
  }

  navigateBack() {
    this.location.back();
  }

  onCreateClick() {
    console.log(this.newMeetingForm.value);
  }


  private getClosestStartTime() {
    const date = new Date();

    let minutes: TimepickerMinutes;
    if (date.getMinutes() < 15) {
      minutes = '15';
    } else if (date.getMinutes() < 30) {
      minutes = '30';
    } else if (date.getMinutes() < 45) {
      minutes = '45';
    } else {
      minutes = '00';
    }

    let hourMap: { [key: number]: TimepickerHours } = {
      0: '12',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '1',
      14: '2',
      15: '3',
      16: '4',
      17: '5',
      18: '6',
      19: '7',
      20: '8',
      21: '9',
      22: '10',
      23: '11',
    };
    let offset = minutes === '00' ? 1 : 0;
    let hour = hourMap[date.getHours() + offset] as TimepickerHours;

    const period = date.getHours() >= 12 ? 'PM' : 'AM';

    return new TimepickerTime(hour, minutes, period);
  }

  private getClosestEndTime() {
    const closestStart = this.getClosestStartTime();
    let { hours, minutes, period } = closestStart;

    if (minutes === '00') {
      minutes = '30';
    } else if (minutes === '15') {
      minutes = '45';
    } else if (minutes === '30') {
      minutes = '00';
      hours = (parseInt(hours) + 1).toString() as TimepickerHours;
    } else {
      minutes = '15';
      hours = (parseInt(hours) + 1).toString() as TimepickerHours;
    }

    return new TimepickerTime(hours, minutes, period);
  }
}
