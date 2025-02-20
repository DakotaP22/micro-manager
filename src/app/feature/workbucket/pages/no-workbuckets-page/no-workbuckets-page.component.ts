import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NewWorkbucketDialogService } from '../../components/new-workbucket-dialog/new-workbucket-dialog.service';
import { injectWorkbucketsResource } from '../../utils/workbucket.resource';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'no-workbuckets-page',
  imports: [MatButtonModule],
  providers: [NewWorkbucketDialogService],
  styles: `
    :host {
      display: grid;
      place-content: center;
      text-align: center;
      padding-block-start: 10%;
      row-gap: 8px;
    }

    h1, h2 { margin: 0; }

    button {
      width: 250px;
      margin-inline: auto;
      margin-block-start: 16px;
    }
  `,
  template: `
    <h1>Looks like you don't have any workbuckets.</h1>
    <h2>Get started by creating a new one!</h2>
    <button
      mat-flat-button
      (click)="onNewWorkbucketClick()">New Workbucket</button>
  `,
})
export class NoWorkbucketsPageComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly newWorkbucketDialogSvc = inject(NewWorkbucketDialogService);
  private readonly userId = inject(AuthService).userId;
  private readonly workbucketsResource = injectWorkbucketsResource(this.userId);

  onNewWorkbucketClick() {
    this.newWorkbucketDialogSvc.openDialog(this.workbucketsResource.resource.value() ?? [])
      .then(name => this.workbucketsResource.createWorkbucket({ name }))
      .then(id => this.router.navigate([id], {
        relativeTo: this.activatedRoute
      }));
  }
}
