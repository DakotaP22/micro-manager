import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs } from '@angular/fire/firestore';
import { CreateFirebaseWorkItem, FirebaseWorkItem, WorkItem } from '../models/WorkItem';

@Injectable({providedIn: 'root'})
export class WorkItemsService {
	firestore = inject(Firestore);
	auth = inject(Auth);

    async getWorkItemsForBucket(bucketId: string | null) {
        const user = await this.auth.currentUser;
        if (!user || !bucketId) {
            return [];
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
            const data = doc.data() as FirebaseWorkItem;
            return {
                id: doc.id,
                ...data,
                dueDate: data.dueDate.toMillis()
            } as WorkItem;
        });

        return workItems?.length > 0 ? [...workItems] : [];
    }
    
    async createWorkItemForBucket(bucketId: string, workItem: CreateFirebaseWorkItem) {
        const user = await this.auth.currentUser;
        if (!user || !bucketId) {
            return;
        }

        const workItemsCollectionRef = collection(
            this.firestore,
            'users',
            user.uid,
            'workbuckets',
            bucketId,
            'workitems'
        );
        await addDoc(workItemsCollectionRef, workItem);
    }

    async deleteWorkItemFromBucket(bucketId: string, workItemId: string) {
        const user = await this.auth.currentUser;
        if (!user) {
            return;
        }

        const workItemDoc = doc(
            this.firestore,
            'users',
            user.uid,
            'workbuckets',
            bucketId,
            'workitems',
            workItemId
        );
        await deleteDoc(workItemDoc);
    }
}
