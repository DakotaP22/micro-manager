import { Component, computed, effect, inject } from '@angular/core';
import { injectParams } from 'ngxtension/inject-params';
import { MeetingService } from '../../service/meeting.service';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { WorkbucketService } from '../../../workbuckets/services/workbucket.service';
import { MeetingTimeDisplayPipe } from '../../../../shared/pipes/meeting-time.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { MeetingNotesComponent } from '../../components/meeting-notes/meeting-notes.component';
import { DiscussionItemsListComponent } from '../../components/discussion-items-list/discussion-items-list.component';
import { FollowUpItemsListComponent } from '../../components/follow-up-items-list/follow-up-items-list.component';

@Component({
  selector: 'app-meeting-page',
  standalone: true,
  imports: [
    MeetingTimeDisplayPipe,
    MatTabsModule,
    MeetingNotesComponent,
    DiscussionItemsListComponent,
    FollowUpItemsListComponent,
  ],
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
    queryFn: () => this.meetingSvc.getMeeting(this.meetingId()),
  }));

  workbucketQuery = injectQuery(() => ({
    queryKey: ['workbucket', this.meetingQuery.data()?.workbucket_id],
    enabled: !!this.meetingQuery.data()?.workbucket_id,
    queryFn: () =>
      this.workbucketSvc.getWorkbucket(this.meetingQuery.data()?.workbucket_id),
  }));

  discussionItemQuery = injectQuery(() => ({
    queryKey: ['meeting', this.meetingId(), 'discussion-items'],
    queryFn: () => this.meetingSvc.getDiscussionItems(this.meetingId()),
  }));

  addDiscussionItemMutation = injectMutation((client) => ({
    mutationFn: (title: string) => {
      return this.meetingSvc.createDiscussionItem(this.meetingId(), title);
    },
    onError: (error) => {
      console.error('Error creating discussion item', error);
    },
    onSuccess: () => {
      console.log('Discussion item created');
      client.invalidateQueries({
        queryKey: ['meeting', this.meetingId(), 'discussion-items'],
      });
    },
  }));


  updateDiscussionItemMutation = injectMutation((client) => ({
    mutationFn: (value: {discussion_item_id: string | null, discussed: boolean}) => {
      return this.meetingSvc.updateDiscussionItem(this.meetingId(), value.discussion_item_id, value.discussed);
    },
    onError: (error) => {
      console.error('Error updating discussion item', error);
    },
    onSuccess: () => {
      console.log('Discussion item updated');
      client.invalidateQueries({
        queryKey: ['meeting', this.meetingId(), 'discussion-items'],
      });
    },
  }));

  updateDiscussionItemStatus(discussion_item_id: string, discussed: boolean) {
    this.updateDiscussionItemMutation.mutate({discussion_item_id, discussed});
  }

  meetingTimesWrapper = computed(() => {
    const meeting = this.meetingQuery.data();

    return {
      start: meeting?.startTime,
      end: meeting?.endTime,
    };
  });
}
