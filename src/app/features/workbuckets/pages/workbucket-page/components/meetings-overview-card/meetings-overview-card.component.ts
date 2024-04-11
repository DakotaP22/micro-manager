import { Component, computed, input } from '@angular/core';
import { Meeting } from '../../../../models/Meeting';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'meetings-overview-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './meetings-overview-card.component.html',
  styleUrl: './meetings-overview-card.component.scss',
})
export class MeetingsOverviewCardComponent {
  meeting = input.required<Meeting | null>();

  meetingTime = computed(() => {
    const meeting = this.meeting();

    if (!meeting?.startTime || !meeting?.endTime) {
      return 'No Timeframe Available';
    }

    const date1 = new Date(meeting.startTime);
    const date2 = new Date(meeting.endTime);

    const d1Date = `${date1.getMonth()}/${date1.getDate()}/${date1.getFullYear()}`;
    const d1Time = `${
      date1.getHours() > 12
        ? this.formatHour(date1.getHours() - 12)
        : this.formatHour(date1.getHours())
    }:${this.formatMinute(date1.getMinutes())}`;
    const d1TOD = `${date1.getHours() > 12 ? 'PM' : 'AM'}`;

    const d2Date = `${date2.getMonth()}/${date2.getDate()}/${date2.getFullYear()}`;
    const d2Time = `${
      date2.getHours() > 12
        ? this.formatHour(date2.getHours() - 12)
        : this.formatHour(date2.getHours())
    }:${this.formatMinute(date2.getMinutes())}`;
    const d2TOD = `${date2.getHours() > 12 ? 'PM' : 'AM'}`;

    if (date1.getDate() === date2.getDate()) {
      return `${d1Date} @ ${d1Time} ${d1TOD} - ${d2Time} ${d2TOD}`;
    } else {
      return `${d1Date} @ ${d1Time} ${d1TOD} - ${d2Date} @ ${d2Time} ${d2TOD}`;
    }
  });

  private formatHour(num: number): string {
    const formatted = num < 10 ? `0${num}` : `${num}`;
    return formatted === '00' ? '12' : formatted;
  }

  private formatMinute(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
