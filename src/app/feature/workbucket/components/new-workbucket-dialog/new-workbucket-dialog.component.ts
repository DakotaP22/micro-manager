import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Workbucket } from '../../models/Workbucket';

export type NewWorkbucketDialogData = {
  workbuckets: Workbucket[];
};

@Component({
  selector: 'new-workbucket-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  styles: `
    mat-form-field { width: 100%;}
  `,
  template: `
    <h2 mat-dialog-title>Create new workbucket.</h2>
    <mat-dialog-content>
      <mat-form-field>
        <mat-label>Workbucket Name</mat-label>
        <input matInput [formControl]="name"/>
        @if(name.errors?.['required']) {
          <mat-error>Workbucket name required.</mat-error>
        } @else if(name.errors?.['nameInUse']) {
          <mat-error>Workbucket already exists.</mat-error>
        }
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button
        mat-button
        cdkFocusInitial
        (click)="onCreateClick()"
        [disabled]="name.invalid"
      >
        Create
      </button>
    </mat-dialog-actions>
  `,
})
export class NewWorkbucketDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NewWorkbucketDialogComponent>);
  readonly dialogData = inject<NewWorkbucketDialogData>(MAT_DIALOG_DATA);
  name = new FormControl<string | null>(null, [Validators.required, nameInUse(this.dialogData.workbuckets)]);
  

  onCreateClick() {
    this.dialogRef.close(this.name.value);
  }
}

export function nameInUse(workbuckets: Workbucket[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const nameInUse = workbuckets.some((workbucket) => workbucket.name.trim() === control.value?.trim());
    return nameInUse ? {nameInUse: {value: control.value}} : null;
  };
}
