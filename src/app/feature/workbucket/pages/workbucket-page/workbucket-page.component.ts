import { Component, computed, inject, input } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { WorkbucketDropdownComponent } from '../../components/workbucket-dropdown/workbucket-dropdown.component';
import { workbucketsResource } from '../../utils/workbucket.resource';

@Component({
  selector: 'workbucket-page',
  imports: [WorkbucketDropdownComponent],
  template: `
    <workbucket-dropdown
      [workbuckets]="workbuckets.value() ?? []"
      [selectedWorkbucketId]="workbucketId()"
      (workbucketSelect)="onWorkbucketSelect($event)" />
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

  onWorkbucketSelect(workbucketId: string) {
    this.router.navigate(['/app', 'workbucket', workbucketId]);
  }

}
