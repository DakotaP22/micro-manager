import { Component, effect, signal } from '@angular/core';
import { WorkItemDetailsFormComponent, WorkItemDetailsFormUpdate } from './work-item-details-form/work-item-details-form.component';
import { WorkItem } from '../../models/WorkItem';

@Component({
  selector: 'new-work-item-page',
  imports: [
    WorkItemDetailsFormComponent
  ],
  template: `
    <work-item-details-form [(workItem)]="workItem" />
  `,
  styles: ``
})
export class NewWorkItemPageComponent {

  workItem = signal({
    priority: 'Medium',
    complexity: 'Medium',
    hoursEstimatedEffort: 0,
    hoursActualEffort: 0,
  } as WorkItem);

  constructor() {
    effect(() => console.log(this.workItem()));
  }
}
