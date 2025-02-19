import { Component, input } from '@angular/core';

@Component({
  selector: 'meetings-overview',
  imports: [],
  template: `
    <h2>Upcoming Meetings</h2>
    <ul class="upcoming-meetings-list">
      @for(meeting of meetings(); track meeting) {
        <li>{{ meeting }}</li>
      } @empty {
        <p>No upcoming meetings.</p>
      }
    </ul>

    <h2>Meeting History</h2>
    <ul class="meeting-history-list">
      @for(meeting of meetings(); track meeting) {
        <li>{{ meeting }}</li>
      } @empty {
        <p>No meeting history.</p>
      }
    </ul>
  `,
  styles: ``,
})
export class MeetingsOverviewComponent {
  meetings = input.required<any[]>();
}
