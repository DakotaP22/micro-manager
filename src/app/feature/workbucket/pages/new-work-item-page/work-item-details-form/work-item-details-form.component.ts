import {
  afterNextRender,
  Component,
  input,
  model,
  viewChild
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  WORK_ITEM_COMPLEXITIES,
  WORK_ITEM_PRIORITIES,
  WORK_ITEM_STATUSES,
  WorkItem,
  WorkItemComplexity,
  WorkItemPriority,
  WorkItemStatus,
} from '../../../models/WorkItem';

import { Timestamp } from '@angular/fire/firestore';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { debounceTime, filter, skip } from 'rxjs';

export type WorkItemDetailsFormMode = 'create' | 'edit';
export type WorkItemDetailsFormUpdate = {
  title: string;
  priority: WorkItemPriority;
  complexity: WorkItemComplexity;
  hoursEstimatedEffort: number;
  hoursActualEffort: number;
  dateDue: Timestamp;
  dateCompleted?: Timestamp | null;
  status: WorkItemStatus;
};

@Component({
  selector: 'work-item-details-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  styles: `
    .title { grid-column: 1 / 5; }
    .status { grid-column: 5 / 7; }
    form {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-column-gap: 1rem;
      grid-row-gap: .5rem;
      padding-inline: 1rem;
      margin-top: 16px;
     }
  `,
  template: `
    <form #workItemForm="ngForm">
      <mat-form-field appearance="outline" class="title">
        <input
          matInput
          placeholder="Work Item Title..."
          required
          minlength="2"
          #name="ngModel"
          name="name"
          [(ngModel)]="workItem().name"
        />
      </mat-form-field>

      <mat-form-field appearance="outline" class="status">
        <mat-label>Status</mat-label>
        <mat-select
          #status="ngModel"
          name="status"
          [(ngModel)]="workItem().status"
          required
        >
          @for(status of statuses; track status) {
          <mat-option [value]="status">{{ status }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Priority</mat-label>
        <mat-select
          #priority="ngModel"
          name="priority"
          [(ngModel)]="workItem().priority"
          required  
        >
          @for(priority of priorities; track priority) {
          <mat-option [value]="priority">{{ priority }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Complexity</mat-label>
        <mat-select
          #complexity="ngModel"
          name="complexity"
          [(ngModel)]="workItem().complexity"
          required
        >
          @for(complexity of complexities; track complexity) {
          <mat-option [value]="complexity">{{ complexity }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Estimated Effort (hrs)</mat-label>
        <input
          matInput
          type="number"
          #hoursEstimatedEffort="ngModel"
          name="hoursEstimatedEffort"
          [(ngModel)]="workItem().hoursEstimatedEffort"
          required
          min="0"
        />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Actual Effort (hrs)</mat-label>
        <input 
        matInput 
        type="number"
        #hoursActualEffort="ngModel"
        name="hoursActualEffort"
        [(ngModel)]="workItem().hoursActualEffort"
        [required]="requireActualEffort()"
      />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Due Date</mat-label>
        <input 
          matInput 
          [matDatepicker]="dueDatePicker" 
          #dateDue="ngModel"
          name="dateDue"
          [(ngModel)]="workItem().dateDue"
          required
          [min]="today"
        />
        <mat-hint>MM/DD/YYYY</mat-hint>
        <mat-datepicker-toggle
          matIconSuffix
          [for]="dueDatePicker"
        ></mat-datepicker-toggle>
        <mat-datepicker #dueDatePicker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Completed On</mat-label>
        <input 
          matInput 
          [matDatepicker]="completedOnPicker" 
          #dateCompleted="ngModel"
          name="dateCompleted"
          [(ngModel)]="workItem().dateCompleted"
          [required]="requireCompletedOnDate()"
        />
        <mat-hint>MM/DD/YYYY</mat-hint>
        <mat-datepicker-toggle
          matIconSuffix
          [for]="completedOnPicker"
        ></mat-datepicker-toggle>
        <mat-datepicker #completedOnPicker></mat-datepicker>
      </mat-form-field>
    </form>
  `,
})
export class WorkItemDetailsFormComponent {
  priorities = WORK_ITEM_PRIORITIES;
  complexities = WORK_ITEM_COMPLEXITIES;
  statuses = WORK_ITEM_STATUSES;

  requireActualEffort = input<boolean>(false);
  requireCompletedOnDate = input<boolean>(false);

  workItem = model.required<WorkItem>();
  workItemForm = viewChild.required<NgForm>('workItemForm');
  valid = model(false);

  today = new Date();

  constructor() {
    afterNextRender(() => {
      const form = this.workItemForm();

      form.valueChanges
        ?.pipe(
          filter((_) => !!form.valid),
          skip(1),
          debounceTime(500)
        )
        ?.subscribe((value) => {
          this.workItem.update((state) => ({
            ...state,
            ...value,
          }));
        });
    });
  }
}
