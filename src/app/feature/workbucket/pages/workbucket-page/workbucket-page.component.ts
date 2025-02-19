import { Component, computed, inject, input } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { MeetingsOverviewComponent } from '../../components/meetings-overview/meetings-overview.component';
import { WorkItemTableComponent } from '../../components/work-item-table/work-item-table.component';
import { WorkbucketDropdownComponent } from '../../components/workbucket-dropdown/workbucket-dropdown.component';
import { WorkbucketStatisticsComponent } from '../../components/workbucket-statistics/workbucket-statistics.component';
import { injectWorkItemsResource } from '../../utils/work-item.resource';
import { injectWorkbucketsResource } from '../../utils/workbucket.resource';

@Component({
  selector: 'workbucket-page',
  imports: [
    WorkbucketDropdownComponent,
    WorkItemTableComponent,
    MeetingsOverviewComponent,
    WorkbucketStatisticsComponent,
  ],
  styles: `
  :host {
    display: grid;
    width: 100%;
    height: 100%;
    padding-block: 32px;
    padding-inline: 2.5%;

    grid-template-rows: min-content min-content 1fr;
    grid-template-columns: 45% 45%;
    column-gap: 5%;

    grid-template-areas:
      "workbucket-dropdown workbucket-dropdown"
      "workbucket-statistics work-item-table"
      "meetings-overview work-item-table";
  }

  #workbucket-dropdown { grid-area: workbucket-dropdown; }
  #workbucket-statistics { grid-area: workbucket-statistics; }
  #meetings-overview { grid-area: meetings-overview; }
  #work-item-table { grid-area: work-item-table; }
`,
  template: `
    <workbucket-dropdown
      id="workbucket-dropdown"
      [workbuckets]="workbuckets.resource.value() ?? []"
      [selectedWorkbucketId]="workbucketId()"
      (workbucketSelect)="onWorkbucketSelect($event)"
    />

    <workbucket-statistics
      id="workbucket-statistics"
      [workItems]="workItems.resource.value() ?? []"
    />

    <meetings-overview
      id="meetings-overview"
      [meetings]="[]"
    />

    <work-item-table
      id="work-item-table"
      [workItems]="workItems.resource.value() ?? []"
    />
  `,
})
export class WorkbucketPageComponent {
  private readonly firestore = inject(Firestore);
  private readonly router = inject(Router);
  private readonly user = inject(AuthService).user;
  private readonly userId = computed(() => this.user()?.uid);

  workbucketId = input.required<string>();

  workbuckets = injectWorkbucketsResource(this.userId);
  workItems = injectWorkItemsResource(this.userId, this.workbucketId);

  onWorkbucketSelect(workbucketId: string) {
    this.router.navigate(['/app', 'workbucket', workbucketId]);
  }
}
