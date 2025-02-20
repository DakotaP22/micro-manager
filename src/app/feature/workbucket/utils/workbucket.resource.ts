import { assertInInjectionContext, inject, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Workbucket, WorkbucketFirebaseDto } from '../models/Workbucket';

export function injectWorkbucketsResource(
  userIdSignal: Signal<string | undefined>
) {
  assertInInjectionContext(injectWorkbucketsResource);
  const firestore = inject(Firestore);

  const resource = rxResource({
    request: () => ({ userId: userIdSignal() }),
    loader: ({ request }) => {
      if (!request.userId) return of([]);

      const workbucketCollection = collection(
        firestore,
        'USER_DATA',
        request.userId,
        'WORKBUCKETS'
      );
      return collectionData(workbucketCollection, {
        idField: 'id',
      }) as Observable<Workbucket[]>;
    },
  });

  return {
    resource,
    createWorkbucket: async (dto: WorkbucketFirebaseDto) => {
      const userId = userIdSignal();
      if (!userId) return;

      const workbucketCollection = collection(
        firestore,
        'USER_DATA',
        userId,
        'WORKBUCKETS'
      );

      const doc = await addDoc(workbucketCollection, dto);
      resource.reload();

      return doc.id;
    },
  };
}
