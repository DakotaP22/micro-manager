import { Signal } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { collection, collectionData, Firestore } from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { WorkItem } from "../models/WorkItem";

export function workItemsResource(
    firestore: Firestore,
    userIdSignal: Signal<string | undefined>,
    workbucketIdSignal: Signal<string | undefined>
) {
    return rxResource({
        request: () => ({
            userId: userIdSignal(),
            workbucketId: workbucketIdSignal()
        }),
        loader: ({ request }) => {
            const { userId, workbucketId } = request;

            if (!userId || !workbucketId) return of([]);

            const workItemCollection = collection(firestore, 'USER_DATA', userId, 'WORKBUCKETS', workbucketId, 'WORK_ITEMS');
            return collectionData(workItemCollection, { idField: 'id' }) as Observable<WorkItem[]>;
        }
    })
}