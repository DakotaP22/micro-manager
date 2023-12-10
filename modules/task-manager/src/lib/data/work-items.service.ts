import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, doc, getDocs } from '@angular/fire/firestore';
import { WorkItem, WorkItemFromFirebase } from '../models/WorkItem';

@Injectable()
export class WorkItemsService {
	firestore = inject(Firestore);
	auth = inject(Auth);

    async getWorkItemsForBucket(bucketId: string | null) {
        const user = await this.auth.currentUser;
        if (!user || !bucketId) {
            return null;
        }

        const workItemsCollectionRef = collection(
            this.firestore,
            'users',
            user.uid,
            'workbuckets',
            bucketId,
            'workitems'
        );
        const workItemsQuerySnapshot = await getDocs(workItemsCollectionRef);
        
        const workItems = workItemsQuerySnapshot.docs.map((doc) => {
            const data = doc.data() as WorkItemFromFirebase;
            return {
                id: doc.id,
                ...data,
                dueDate: data.dueDate.toMillis()
            } as WorkItem;
        });
    
        return workItems;
	}
}
