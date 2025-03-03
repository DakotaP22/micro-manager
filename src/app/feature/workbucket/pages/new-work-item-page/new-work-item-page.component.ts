import { Component, effect, signal } from '@angular/core';
import { WorkItem } from '../../models/WorkItem';
import { WorkItemDetailsFormComponent } from './work-item-details-form/work-item-details-form.component';

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
    status: 'Open',
    hoursEstimatedEffort: 0,
    hoursActualEffort: 0,
  } as WorkItem);

  constructor() {
    effect(() => console.log(this.workItem()));
  }
}
