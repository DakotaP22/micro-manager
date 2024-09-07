import { Component, computed, effect, inject } from '@angular/core';
import { injectParams } from 'ngxtension/inject-params';
import { MeetingService } from '../../service/meeting.service';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { WorkbucketService } from '../../../workbuckets/services/workbucket.service';
import { MeetingTimeDisplayPipe } from '../../../../shared/pipes/meeting-time.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { MeetingNotesComponent } from '../../components/meeting-notes/meeting-notes.component';
import { DiscussionItemsListComponent } from '../../components/discussion-items-list/discussion-items-list.component';
import { FollowUpItemsListComponent } from '../../components/follow-up-items-list/follow-up-items-list.component';
import { MeetingNotesService } from '../../service/meeting-notes.service';
import { MeetingDiscussionItemsService } from '../../service/meeting-discussion-items.service';
import { MeetingFollowUpsService } from '../../service/meeting-follow-ups.service';

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
  providers: [
    MeetingService,
    WorkbucketService,
    MeetingNotesService,
    MeetingDiscussionItemsService,
    MeetingFollowUpsService,
  ],
  templateUrl: './meeting-page.component.html',
  styleUrl: './meeting-page.component.scss',
})
export class MeetingPageComponent {
  private meetingSvc = inject(MeetingService);
  private notesSvc = inject(MeetingNotesService);
  private discussionItemsSvc = inject(MeetingDiscussionItemsService);
  private followUpsSvc = inject(MeetingFollowUpsService);
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

  notesQuery = injectQuery(() => ({
    queryKey: ['meeting', this.meetingId(), 'notes'],
    enabled: !!this.meetingId(),
    queryFn: () => this.notesSvc.getMeetingNotes(this.meetingId()),
  }));

  updateNotesMutation = injectMutation((client) => ({
    mutationFn: (notes: string) =>
      this.notesSvc.updateMeetingNotes(this.meetingId(), notes),
    onError: (error) => {
      console.error('Error updating notes', error);
    },
    onSuccess: () => {
      console.log('Notes updated');
      client.invalidateQueries({
        queryKey: ['meeting', this.meetingId(), 'notes'],
      });
    },
  }));

  discussionItemQuery = injectQuery(() => ({
    queryKey: ['meeting', this.meetingId(), 'discussion-items'],
    enabled: !!this.meetingId(),
    queryFn: () => this.discussionItemsSvc.getDiscussionItems(this.meetingId()),
  }));

  followUpItemQuery = injectQuery(() => ({
    queryKey: ['meeting', this.meetingId(), 'follow-up-items'],
    enabled: !!this.meetingId(),
    queryFn: () => {
      return this.followUpsSvc.getFollowUpItems(this.meetingId());
    },
  }));

  addFollowUpItemMutation = injectMutation((client) => ({
    mutationFn: (details: string) =>
      this.followUpsSvc.createFollowUpItem(this.meetingId(), details),
    onError: (error) => {
      console.error('Error creating follow up item', error);
    },
    onSuccess: () => {
      console.log('Follow up item created');
      client.invalidateQueries({
        queryKey: ['meeting', this.meetingId(), 'follow-up-items'],
      });
    },
  }));

  deleteFollowUpItemMutation = injectMutation((client) => ({
    mutationFn: (follow_up_id: string | null) =>
      this.followUpsSvc.deleteFollowUpItem(this.meetingId(), follow_up_id),
    onError: (error) => {
      console.error('Error deleting follow up item', error);
    },
    onSuccess: () => {
      console.log('Follow up item deleted');
      client.invalidateQueries({
        queryKey: ['meeting', this.meetingId(), 'follow-up-items'],
      });
    },
  }));

  addDiscussionItemMutation = injectMutation((client) => ({
    mutationFn: (title: string) => {
      return this.discussionItemsSvc.createDiscussionItem(
        this.meetingId(),
        title
      );
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
    mutationFn: (value: {
      discussion_item_id: string | null;
      discussed: boolean;
    }) => {
      return this.discussionItemsSvc.updateDiscussionItem(
        this.meetingId(),
        value.discussion_item_id,
        value.discussed
      );
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

  meetingTimesWrapper = computed(() => {
    const meeting = this.meetingQuery.data();

    return {
      start: meeting?.startTime,
      end: meeting?.endTime,
    };
  });
}
