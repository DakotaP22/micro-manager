import { Component, Input, computed, effect, input, output } from '@angular/core';
import { Meeting } from '../../../../../meetings/models/Meeting';
import { MeetingsOverviewCardComponent } from '../meetings-overview-card/meetings-overview-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'workbucket-meetings-overview',
  standalone: true,
  imports: [MeetingsOverviewCardComponent, MatIconModule, MatButtonModule],
  templateUrl: './meetings-overview.component.html',
  styleUrl: './meetings-overview.component.scss',
})
export class MeetingsComponent {
  meetings = input<Meeting[]>([]);
  newMeetingClicked = output<void>();

  nextMeeting = computed<Meeting | null>(() => {
    const sortedAndFiltered =
      this.meetings()
        ?.filter((meeting) => meeting.startTime.getTime() > Date.now())
        ?.sort(
          (a, b) =>
            a.startTime.getMilliseconds() - b.startTime.getMilliseconds()
        ) ?? [];

    if (sortedAndFiltered.length > 0) {
      return sortedAndFiltered[0];
    } else {
      return null;
    }
  });

  meetingHistory = computed<Meeting[]>(() => {
    return (
      this.meetings()
        ?.filter((meeting) => meeting.startTime.getTime() < Date.now())
        ?.sort(
          (a, b) =>
            a.startTime.getTime() - b.startTime.getTime()
        ) ?? []
    );
  });
}
