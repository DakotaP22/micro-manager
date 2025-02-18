import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Workbucket } from '../../models/Workbucket';

@Component({
  selector: 'workbucket-dropdown',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule],
  template: `
    <mat-form-field>
      <mat-select [value]="selectedWorkbucketId()" (selectionChange)="workbucketSelect.emit($event.value)">
        @for (workbucket of workbuckets(); track workbucket.id) {
          <mat-option [value]="workbucket.id">{{ workbucket.name }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
  styles: ``,
})
export class WorkbucketDropdownComponent {
  workbuckets = input.required<Workbucket[]>();
  selectedWorkbucketId = input.required<string>();
  workbucketSelect = output<string>();
}
