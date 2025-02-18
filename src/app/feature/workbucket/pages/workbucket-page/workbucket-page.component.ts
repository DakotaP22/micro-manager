import { Component, computed, inject, input } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { WorkbucketDropdownComponent } from '../../components/workbucket-dropdown/workbucket-dropdown.component';
import { workbucketsResource } from '../../utils/workbucket.resource';
import { WorkItemTableComponent } from '../../components/work-item-table/work-item-table.component';
import { workItemsResource } from '../../utils/work-item.resource';

@Component({
  selector: 'workbucket-page',
  imports: [
    WorkbucketDropdownComponent,
    WorkItemTableComponent,
  ],
  template: `
    <workbucket-dropdown
      [workbuckets]="workbuckets.value() ?? []"
      [selectedWorkbucketId]="workbucketId()"
      (workbucketSelect)="onWorkbucketSelect($event)" />

    <work-item-table [workItems]="workItems.value() ?? []" />
  `,
  styles: ``
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
