import { Component, computed, inject, input } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { WorkItemTableComponent } from '../../components/work-item-table/work-item-table.component';
import { WorkbucketDropdownComponent } from '../../components/workbucket-dropdown/workbucket-dropdown.component';
import { workItemsResource } from '../../utils/work-item.resource';
import { workbucketsResource } from '../../utils/workbucket.resource';

@Component({
  selector: 'workbucket-page',
  imports: [WorkbucketDropdownComponent, WorkItemTableComponent],
  template: `
    <workbucket-dropdown
      [workbuckets]="workbuckets.value() ?? []"
      [selectedWorkbucketId]="workbucketId()"
      (workbucketSelect)="onWorkbucketSelect($event)"
    />

    <work-item-table [workItems]="workItems.value() ?? []" />
  `,
  styles: `
    :host {
      display: grid;
      padding-block: 32px;  
      padding-inline: 64px;

      grid-template-rows: auto 1fr;
      grid-template-columns: 45% 45%;
      column-gap: 10%;
    }
  `,
})
export class WorkbucketPageComponent {
  private readonly firestore = inject(Firestore);
  private readonly router = inject(Router);
  private readonly user = inject(AuthService).user;
  private readonly userId = computed(() => this.user()?.uid);

  workbucketId = input.required<string>();

  workbuckets = workbucketsResource(this.firestore, this.userId);
  workItems = workItemsResource(this.firestore, this.userId, this.workbucketId);

  onWorkbucketSelect(workbucketId: string) {
    this.router.navigate(['/app', 'workbucket', workbucketId]);
  }
}
