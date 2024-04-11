import { Component, computed, effect, inject } from '@angular/core';
import { WorkbucketSelectComponent } from './components/workbucket-select/workbucket-select.component';
import { Router } from '@angular/router';
import { injectParams } from 'ngxtension/inject-params';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { WorkbucketService } from '../../services/workbucket.service';
import { WorkItemBreakdownComponent } from './components/work-item-breakdown/work-item-breakdown.component';
import { MeetingService } from '../../services/meeting.service';
import { MeetingsComponent } from './components/meetings-overview/meetings-overview.component';

@Component({
  selector: 'app-workbucket-page',
  standalone: true,
  imports: [WorkbucketSelectComponent, WorkItemBreakdownComponent, MeetingsComponent],
  providers: [WorkbucketService, MeetingService],
  templateUrl: './workbucket-page.component.html',
  styleUrl: './workbucket-page.component.scss',
})
export class WorkbucketPageComponent {
  router = inject(Router);
  workbucketId = injectParams('id');
  workbucketSvc = inject(WorkbucketService);
  meetingSvc = inject(MeetingService);

  workbucket = injectQuery(() => ({
    queryKey: ['workbuckets', '1', this.workbucketId()],
    queryFn: ({ queryKey }) => this.workbucketSvc.getWorkbucket(queryKey[2]),
    enabled: !!this.workbucketId(),
  }));
  workbuckets = injectQuery(() => ({
    queryKey: ['workbuckets', '1'],
    queryFn: ({ queryKey }) => this.workbucketSvc.getWorkbuckets(queryKey[1]),
  }));
  meetings = injectQuery(() => ({
    queryKey: ['meetings', '1', this.workbucketId()],
    queryFn: ({ queryKey }) =>
      this.meetingSvc.getMeetingsForUserAndWorkbucketId(
        queryKey[1],
        queryKey[2]
      ),
    enabled: !!this.workbucketId(),
  }));

  onBucketSelected(bucket_id: string) {
    this.router.navigate(['/workbucket', bucket_id]);
  }
}
