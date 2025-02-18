import { Component, effect, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { Workbucket } from '../../models/Workbucket';
import { WorkbucketDropdownComponent } from '../../components/workbucket-dropdown/workbucket-dropdown.component';
import { Router } from '@angular/router';

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
  private firestore = inject(Firestore);
  private router = inject(Router);
  private user = inject(AuthService).user;
  workbucketId = input.required<string>();
  
  workbuckets = rxResource({
    request: () => ({ userId: this.user()?.uid }),
    loader: ({ request }) => {
      if (!request.userId) return of([]);

      const workbucketCollection = collection(this.firestore, 'USER_DATA', request.userId, 'WORKBUCKETS');
      return collectionData(workbucketCollection, { idField: 'id' }) as Observable<Workbucket[]>;
    }
  })

  onWorkbucketSelect(workbucketId: string) {
    this.router.navigate(['/app', 'workbucket', workbucketId]);
  }

}
