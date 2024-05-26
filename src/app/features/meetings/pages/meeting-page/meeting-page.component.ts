import { Component, computed, effect, inject } from '@angular/core';
import { injectParams } from 'ngxtension/inject-params';
import { MeetingService } from '../../service/meeting.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { WorkbucketService } from '../../../workbuckets/services/workbucket.service';
import { MeetingTimeDisplayPipe } from '../../../../shared/pipes/meeting-time.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { MeetingNotesComponent } from '../../components/meeting-notes/meeting-notes.component';
import { DiscussionItemsListComponent } from '../../components/discussion-items-list/discussion-items-list.component';
import { FollowUpItemsListComponent } from '../../components/follow-up-items-list/follow-up-items-list.component';

@Component({
  selector: 'app-meeting-page',
  standalone: true,
  imports: [MeetingTimeDisplayPipe, MatTabsModule, MeetingNotesComponent, DiscussionItemsListComponent, FollowUpItemsListComponent],
  providers: [MeetingService, WorkbucketService],
  templateUrl: './meeting-page.component.html',
  styleUrl: './meeting-page.component.scss',
})
export class MeetingPageComponent {
  private meetingSvc = inject(MeetingService);
  private workbucketSvc = inject(WorkbucketService);
  meetingId = injectParams('id');

  meetingQuery = injectQuery(() => ({
    queryKey: ['meeting', this.meetingId()],
    enabled: !!this.meetingId(),
    queryFn: () => this.meetingSvc.getMeeting(this.meetingId())
  }));

  workbucketQuery = injectQuery(() => ({
    queryKey: [],
    enabled: !!this.meetingQuery.data()?.workbucket_id,
    queryFn: () => this.workbucketSvc.getWorkbucket(this.meetingQuery.data()?.workbucket_id)
  }))

  meetingTimesWrapper = computed(() => {
    const meeting = this.meetingQuery.data();

    return {
      start: meeting?.startTime,
      end: meeting?.endTime
    }
  })
}
