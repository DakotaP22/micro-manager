import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { ReadWorkItemDTO } from '../models/dto/WorkItem/ReadWorkItemDTO';
import { WorkItem } from '../models/WorkItem';
import { CreateWorkItemDTO } from '../models/dto/WorkItem/CreateWorkItemDTO';
import { UpdateWorkItemDTO } from '../models/dto/WorkItem/UpdateWorkItemDTO';
import { UpdateWorkItemNotesDTO } from '../models/dto/WorkItem/UpdateWorkItemNotesDTO';

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
            const data = doc.data() as ReadWorkItemDTO;
            return {
                id: doc.id,
                ...data,
                dueDate: data.dueDate.toMillis()
            } as WorkItem;
        });

        return workItems?.length > 0 ? [...workItems] : [];
    }

    async getWorkItemForBucket(bucketId: string | null, workItemId: string | null) {
        const user = await this.auth.currentUser;
        if (!user || !bucketId || !workItemId) {
            return null;
        }

        const workItemDocRef = doc(
            this.firestore,
            'users',
            user.uid,
            'workbuckets',
            bucketId,
            'workitems',
            workItemId
        );
        const workItemsQuerySnapshot = await getDoc(workItemDocRef);
        
        const workItemFromFirebase = workItemsQuerySnapshot.data() as ReadWorkItemDTO;

        if (!workItemFromFirebase) {
            return null;
        }

        const workItem: WorkItem = {
            id: workItemsQuerySnapshot.id,
            ...workItemFromFirebase,
            dueDate: workItemFromFirebase.dueDate.toMillis()
        };

        return workItem;
    }
    
    async createWorkItemForBucket(bucketId: string, workItem: CreateWorkItemDTO) {
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

    async updateWorkItem(bucketId: string | null, workItemId: string | null, workItemUpdate: UpdateWorkItemDTO) {
        const user = await this.auth.currentUser;
        if (!user || !bucketId || !workItemId) {
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
        await updateDoc(workItemDoc, workItemUpdate);
    }

    async updateNotesForWorkItem(bucketId: string | null, workItemId: string | null, notes: string) {
        const user = await this.auth.currentUser;
        if (!user || !bucketId || !workItemId) {
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
        
        const updateWorkItemNotesDTO = {
            notes
        } as UpdateWorkItemNotesDTO;

        await updateDoc(workItemDoc, updateWorkItemNotesDTO);

    }
}
