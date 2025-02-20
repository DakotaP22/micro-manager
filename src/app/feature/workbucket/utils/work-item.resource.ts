import { assertInInjectionContext, inject, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { WorkItem, WorkItemFirebaseDto } from '../models/WorkItem';

export function injectWorkItemsResource(
  userIdSignal: Signal<string | undefined>,
  workbucketIdSignal: Signal<string | undefined>
) {
  assertInInjectionContext(injectWorkItemsResource);
  const firestore = inject(Firestore);

  const resource = rxResource({
    request: () => ({
      userId: userIdSignal(),
      workbucketId: workbucketIdSignal(),
    }),
    loader: ({ request }) => {
      const { userId, workbucketId } = request;

      if (!userId || !workbucketId) return of([]);

      const workItemCollection = collection(
        firestore,
        'USER_DATA',
        userId,
        'WORKBUCKETS',
        workbucketId,
        'WORK_ITEMS'
      );
      return collectionData(workItemCollection, {
        idField: 'id',
      }) as Observable<WorkItem[]>;
    },
  });

  return {
    resource,
    addWorkItem: async (workItem: WorkItemFirebaseDto) => {
      const userId = userIdSignal();
      const workbucketId = workbucketIdSignal();

      if (!userId || !workbucketId) return;

      const workItemCollection = collection(
        firestore,
        'USER_DATA',
        userId,
        'WORKBUCKETS',
        workbucketId,
        'WORK_ITEMS'
      );

      const doc = await addDoc(workItemCollection, workItem);

      resource.reload();
      return doc.id;
      },
  };
}
