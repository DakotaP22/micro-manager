import { Component, computed, inject, input } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { MeetingsOverviewComponent } from '../../components/meetings-overview/meetings-overview.component';
import { WorkItemTableComponent } from '../../components/work-item-table/work-item-table.component';
import { WorkbucketDropdownComponent } from '../../components/workbucket-dropdown/workbucket-dropdown.component';
import { WorkbucketStatisticsComponent } from '../../components/workbucket-statistics/workbucket-statistics.component';
import { injectWorkItemsResource } from '../../utils/work-item.resource';
import { injectWorkbucketsResource } from '../../utils/workbucket.resource';
import { NewWorkbucketDialogComponent } from '../../components/new-workbucket-dialog/new-workbucket-dialog.component';
import { NewWorkbucketDialogService } from '../../components/new-workbucket-dialog/new-workbucket-dialog.service';

@Component({
  selector: 'workbucket-page',
  imports: [
    WorkbucketDropdownComponent,
    WorkItemTableComponent,
    MeetingsOverviewComponent,
    WorkbucketStatisticsComponent,
  ],
  providers: [NewWorkbucketDialogService],
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
      (newWorkbucketTrigger)="onNewWorkbucketTrigger()"
    />

    <workbucket-statistics
      id="workbucket-statistics"
      [workItems]="workItems.resource.value() ?? []"
    />

    <meetings-overview id="meetings-overview" [meetings]="[]" />

    <work-item-table
      id="work-item-table"
      [workItems]="workItems.resource.value() ?? []"
      (newWorkItemTrigger)="onNewWorkItemTrigger()"
    />
  `,
})
export class WorkbucketPageComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly newWorkbucketDialogSvc = inject(NewWorkbucketDialogService);
  private readonly user = inject(AuthService).user;
  private readonly userId = computed(() => this.user()?.uid);

  workbucketId = input.required<string>();

  workbuckets = injectWorkbucketsResource(this.userId);
  workItems = injectWorkItemsResource(this.userId, this.workbucketId);

  onWorkbucketSelect(workbucketId: string) {
    this.router.navigate(['../', workbucketId], {
      relativeTo: this.activatedRoute,
    });
  }

  onNewWorkbucketTrigger() {
    this.newWorkbucketDialogSvc
      .openDialog(this.workbuckets.resource.value() ?? [])
      .then((name: string) => this.workbuckets.createWorkbucket({ name }))
      .then((workbucketId) =>
        this.router.navigate([workbucketId], {
          relativeTo: this.activatedRoute,
        })
      );
  }

  onNewWorkItemTrigger() {
    this.router.navigate(['work-item', 'new'], {
      relativeTo: this.activatedRoute,
    });
  }
}
