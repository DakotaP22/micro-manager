import { Component, computed, input } from '@angular/core';
import { WorkItem } from '../../models/WorkItem';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'workbucket-statistics',
  imports: [MatDividerModule],
  template: `
    <ul>
      <li>
        <p>Total Work Items:</p>
        <p>{{totalWorkItems()}}</p>
      </li>
      <li>
        <p>Completed Work Items:</p>
        <p>{{completedWorkItems()}}</p>
      </li>
      <li>
        <p>Open Work Items:</p>
        <p>{{openWorkItems()}}</p>
      </li>
      <li>
        <p>Blocked Work Items:</p>
        <p>{{blockedWorkItems()}}</p>
      </li>
      <li>
        <p>Backlogged Work Items:</p>
        <p>{{backloggedWorkItems()}}</p>
      </li>
      <li>
        <p>Past Due Work Items:</p>
        <p>{{pastDueWorkItems()}}</p>
      </li>
      <li>
        <p>Due Soon:</p>
        <p>{{dueSoonWorkItems()}}</p>
      </li>
    </ul>
    <mat-divider></mat-divider>
  `,
  styles: `
    ul { list-style: none; padding: 0; }
    li { display: flex; justify-content: space-between; }
    p { margin-block: 4px;}
  `
})
export class WorkbucketStatisticsComponent {
  workItems = input.required<WorkItem[]>();
  dueSoonOffsetDays = 3; // how many days before the due date should we consider a work item due soon

  totalWorkItems = computed(() => this.workItems().length);
  completedWorkItems = computed(() => this.workItems().filter((workItem: WorkItem) => workItem.status === 'Complete').length);
  openWorkItems = computed(() => this.workItems().filter((workItem: WorkItem) => workItem.status === 'Open').length);
  blockedWorkItems = computed(() => this.workItems().filter((workItem: WorkItem) => workItem.status === 'Blocked').length);
  backloggedWorkItems = computed(() => this.workItems().filter((workItem: WorkItem) => workItem.status === 'Backlogged').length);
  pastDueWorkItems = computed(() => this.workItems().filter((workItem: WorkItem) => workItem.dateDue.toDate() < new Date()).length);
  dueSoonWorkItems = computed(() => this.workItems().filter((workItem: WorkItem) => {
    const dateDue = workItem.dateDue.toDate();
    const dueSoonDate = new Date();
    dueSoonDate.setDate(dueSoonDate.getDate() + this.dueSoonOffsetDays);
    return dateDue >= new Date() && dateDue <= dueSoonDate;
  }).length);
}
