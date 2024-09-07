import { Component, computed, effect, inject } from '@angular/core';
import { injectParams } from 'ngxtension/inject-params';
import { MeetingService } from '../../services/meeting.service';
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
import { MeetingNotesService } from '../../services/meeting-notes.service';
import { MeetingDiscussionItemsService } from '../../services/meeting-discussion-items.service';
import { MeetingFollowUpsService } from '../../services/meeting-follow-ups.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private snackbarSvc = inject(MatSnackBar);

  meetingId = injectParams('id');
  meetingTimesWrapper = computed(() => {
    const meeting = this.meetingQuery.data();

    return {
      start: meeting?.startTime,
      end: meeting?.endTime,
    };
  });

  // #region Queries
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
  // #endregion

  // #region Mutations
  updateNotesMutation = injectMutation((client) => ({
    mutationFn: (notes: string) =>
      this.notesSvc.updateMeetingNotes(this.meetingId(), notes),
    onError: (error) =>
      this.snackbarSvc.open('Error updating notes.', 'Dismiss', {
        duration: 5000,
      }),
    onSuccess: () => {
      this.snackbarSvc.open('Notes updated.', 'Dismiss', { duration: 3000 });
      client.invalidateQueries({
        queryKey: ['meeting', this.meetingId(), 'notes'],
      });
    },
  }));

  addFollowUpItemMutation = injectMutation((client) => ({
    mutationFn: (details: string) =>
      this.followUpsSvc.createFollowUpItem(this.meetingId(), details),
    onError: (error) =>
      this.snackbarSvc.open('Error creating follow up item.', 'Dismiss', {
        duration: 5000,
      }),
    onSuccess: () => {
      this.snackbarSvc.open('Follow up item created.', 'Dismiss', {
        duration: 3000,
      });
      client.invalidateQueries({
        queryKey: ['meeting', this.meetingId(), 'follow-up-items'],
      });
    },
  }));

  deleteFollowUpItemMutation = injectMutation((client) => ({
    mutationFn: (follow_up_id: string | null) =>
      this.followUpsSvc.deleteFollowUpItem(this.meetingId(), follow_up_id),
    onError: (error) =>
      this.snackbarSvc.open('Error deleting follow up item.', 'Dismiss', {
        duration: 5000,
      }),
    onSuccess: () => {
      this.snackbarSvc.open('Follow up item deleted.', 'Dismiss', {
        duration: 3000,
      });
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
    onError: (error) =>
      this.snackbarSvc.open('Error creating discussion item.', 'Dismiss', {
        duration: 5000,
      }),
    onSuccess: () => {
      this.snackbarSvc.open('Discussion item created.', 'Dismiss', {
        duration: 3000,
      });
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
    onError: (error) =>
      this.snackbarSvc.open('Error updating discussion item.', 'Dismiss', {
        duration: 5000,
      }),
    onSuccess: () => {
      this.snackbarSvc.open('Discussion item updated.', 'Dismiss', {
        duration: 3000,
      });
      client.invalidateQueries({
        queryKey: ['meeting', this.meetingId(), 'discussion-items'],
      });
    },
  }));
  // #endregion
}
