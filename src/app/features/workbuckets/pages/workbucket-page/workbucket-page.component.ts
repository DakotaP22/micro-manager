import { Component, computed, effect, inject, signal } from '@angular/core';
import { WorkbucketSelectComponent } from './components/workbucket-select/workbucket-select.component';
import { Router } from '@angular/router';
import { injectParams } from 'ngxtension/inject-params';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { WorkbucketService } from '../../services/workbucket.service';
import { WorkItemBreakdownComponent } from './components/work-item-breakdown/work-item-breakdown.component';
import { MeetingService } from '../../../meetings/services/meeting.service';
import { MeetingsComponent } from './components/meetings-overview/meetings-overview.component';
import { WorkItemTableComponent } from './components/work-item-table/work-item-table.component';
import { WorkItem } from '../../models/WorkItem';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-workbucket-page',
  standalone: true,
  imports: [
    WorkbucketSelectComponent,
    WorkItemBreakdownComponent,
    MeetingsComponent,
    WorkItemTableComponent,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [WorkbucketService, MeetingService],
  templateUrl: './workbucket-page.component.html',
  styleUrl: './workbucket-page.component.scss',
})
export class WorkbucketPageComponent {
  router = inject(Router);
  authSvc = inject(AuthService);
  workbucketId = injectParams('id');
  workbucketSvc = inject(WorkbucketService);
  meetingSvc = inject(MeetingService);
  userId = toSignal(this.authSvc.idToken$);

  workbucket = injectQuery(() => ({
    queryKey: ['workbuckets', this.userId(), this.workbucketId()],
    queryFn: ({ queryKey }) =>
      this.workbucketSvc.getWorkbucket(queryKey[2]?? null),
    enabled: !!this.workbucketId(),
  }));
  workbuckets = injectQuery(() => ({
    queryKey: ['workbuckets', this.userId()],
    queryFn: ({ queryKey }) => this.workbucketSvc.getWorkbuckets(queryKey[1] ?? null),
  }));
  meetings = injectQuery(() => ({
    queryKey: ['meetings', this.userId(), this.workbucketId()],
    queryFn: ({ queryKey }) =>
      this.meetingSvc.getMeetingsForUserAndWorkbucketId(
        queryKey[1] ?? null,
        queryKey[2] ?? null
      ),
    enabled: !!this.workbucketId(),
  }));
  workItems = signal<WorkItem[]>([
    {
      name: 'Work Item 1',
      status: 'Not Started',
      complexity: 'Low',
      priority: 'Low',
      dueDate: new Date(),
    } as WorkItem,
    {
      name: 'Work Item 2',
      status: 'In Progress',
      complexity: 'Medium',
      priority: 'Medium',
      dueDate: new Date(),
    } as WorkItem,
    {
      name: 'Work Item 3',
      status: 'Blocked',
      complexity: 'High',
      priority: 'High',
      dueDate: new Date(),
    } as WorkItem,
    {
      name: 'Work Item 4',
      status: 'Closed',
      complexity: 'High',
      priority: 'High',
      dueDate: new Date(),
    } as WorkItem,
  ]);

  onBucketSelected(bucket_id: string) {
    this.router.navigate(['/workbucket', bucket_id]);
  }

  onNewMeetingClicked() {
    this.router.navigate(['meetings', 'create'], {
      queryParams: { workbucket: this.workbucketId() },
    });
  }
}
