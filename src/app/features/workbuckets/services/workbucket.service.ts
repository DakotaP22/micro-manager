import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from '@angular/fire/firestore';
import { Workbucket } from '../models/Workbucket';

@Injectable()
export class WorkbucketService {
  firestore = inject(Firestore);

  async getWorkbuckets(user_id: string | null): Promise<Workbucket[]> {
    if (!user_id) {
      return [];
    }

    console.log('Getting Workbuckets for ' + user_id);

    const workbucketCollection = collection(this.firestore, 'workbuckets');
    const q = query(workbucketCollection, where('user_id', '==', user_id));

    const workbucketDocs = await getDocs(q);
    const workbuckets = workbucketDocs.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Workbucket)
    );
    console.log(workbuckets);
    return workbuckets;
  }

  async getWorkbucket(bucket_id: string | null): Promise<Workbucket | null> {
    if (!bucket_id) {
      return null;
    }

    const workbucketCollection = collection(this.firestore, 'workbuckets');

    const workbucketDoc = doc(workbucketCollection, bucket_id);
    const workbucketSnapshot = await getDoc(workbucketDoc);

    const workbucket = {
      id: workbucketSnapshot.id,
      ...workbucketSnapshot.data(),
    } as Workbucket;
    console.log(workbucket);
    return workbucket;
  }
}
