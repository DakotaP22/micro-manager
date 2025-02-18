import { Signal } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { collection, collectionData, Firestore } from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { Workbucket } from "../models/Workbucket";

export function workbucketsResource(
    firestore: Firestore,
    userIdSignal: Signal<string | undefined>,
) {
    return rxResource({
        request: () => ({ userId: userIdSignal()}),
        loader: ({ request }) => {
          if (!request.userId) return of([]);
    
          const workbucketCollection = collection(firestore, 'USER_DATA', request.userId, 'WORKBUCKETS');
          return collectionData(workbucketCollection, { idField: 'id' }) as Observable<Workbucket[]>;
        }
      })
}