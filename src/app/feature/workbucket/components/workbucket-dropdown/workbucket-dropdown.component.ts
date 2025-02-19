import { Component, effect, input, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MatSelect } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Workbucket } from '../../models/Workbucket';

@Component({
  selector: 'workbucket-dropdown',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, MatIconModule],
  styles: `
    mat-form-field { width: 100%; }
    mat-icon { margin-inline-end: 8px; }

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      width: 100%;
      height: 48px;
      display: flex;
      align-items: center;
      text-align: left;
      padding: 0 16px;
      font-family: Roboto;
      font-size: 16px;
      font-weight: 500;
    }

    button:hover {
      background-color: var(--mat-option-hover-state-layer-color,
        color-mix(
          in srgb,
          var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity)* 100%),
          transparent
        )
      );
    }
  `,
  template: `
    <mat-form-field>
      <mat-select
        #select
        [value]="selectedWorkbucketId()"
        (selectionChange)="workbucketSelect.emit($event.value)"
      >
        <button (click)="onNewWorkbucketClick()">
          <mat-icon fontIcon="add_circle_outline" />
          <span>Add New Bucket</span>
        </button>
        @for (workbucket of workbuckets(); track workbucket.id) {
        <mat-option [value]="workbucket.id">{{ workbucket.name }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
})
export class WorkbucketDropdownComponent {
  matSelect = viewChild.required(MatSelect);

  workbuckets = input.required<Workbucket[]>();
  selectedWorkbucketId = input.required<string>();
  workbucketSelect = output<string>();
  newWorkbucketTrigger = output<void>();

  onSelectionChange(id: string) {
    if (id) {
      this.workbucketSelect.emit(id);
    }
  }

  onNewWorkbucketClick() {
    this.matSelect().close();
    this.newWorkbucketTrigger.emit();
  }
}
