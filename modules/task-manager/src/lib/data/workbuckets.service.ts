import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
	Firestore,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from '@angular/fire/firestore';
import { WorkItem, WorkItemFromFirebase } from '../models/WorkItem';
import { Workbucket } from '../models/Workbucket';
import { WorkbucketDetails } from '../models/WorkbucketDetails';

@Injectable()
export class WorkbucketsService {
	firestore = inject(Firestore);
	auth = inject(Auth);

	async getWorkbucketsForSignedInUser(): Promise<Workbucket[]> {
		const user = this.auth.currentUser;
		if (!user) {
			return [];
		}

		const collectionRef = collection(
			this.firestore,
			'users',
			user.uid,
			'workbuckets'
		);
		const q = query(collectionRef, where('archived', '==', false));
		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			return [];
		}

		return querySnapshot.docs.map((doc) => {
			return {
				id: doc.id,
				...doc.data(),
			} as Workbucket;
		}).sort((a, b) => a.priority - b.priority);
	}

	async getWorkbucketDetailsForSignedInUser(
		bucketId: string
	): Promise<Workbucket | null> {
		const user = this.auth.currentUser;
		if (!user) {
			return null;
		}

		// get workbucket for user and given id
		const bucketDocRef = doc(
			this.firestore,
			'users',
			user.uid,
			'workbuckets',
			bucketId
		);
		const bucketDoc = await getDoc(bucketDocRef);

		if (!bucketDoc) {
			return null;
		}

		const workbucket = {
			id: bucketDoc.id,
			...bucketDoc.data(),
		} as Workbucket;

		return workbucket;
	}

	async archiveBucket(bucketId: string): Promise<void> {
		const user = this.auth.currentUser;
		if (!user) {
			return;
		}

		const collectionRef = doc(
			this.firestore,
			'users',
			user.uid,
			'workbuckets',
			bucketId
		);
		await updateDoc(collectionRef, { archived: true });
	}

	async deleteBucket(bucketId: string): Promise<void> {
		const user = this.auth.currentUser;
		if (!user) {
			return;
		}

		const collectionRef = doc(
			this.firestore,
			'users',
			user.uid,
			'workbuckets',
			bucketId
		);
		await deleteDoc(collectionRef);
	}

	async addBucket(title: string, description?: string | null, priority?: number | null, allocation?: number | null): Promise<void> {
		const user = this.auth.currentUser;
		if (!user) {
			return;
		}

		const collectionRef = collection(
			this.firestore,
			'users',
			user.uid,
			'workbuckets'
		);


		const bucket: Partial<Workbucket> = description
			? { title, description, archived: false, allocation: allocation ?? 0, priority: priority ?? 1000 }
			: { title, archived: false, allocation: allocation ?? 0, priority: priority ?? 1000 };
		
		await addDoc(collectionRef, bucket);
	}

	async updateBucket(bucketId: string, title: string, description?: string | null, priority?: number | null, allocation?: number | null): Promise<void> {
		const user = this.auth.currentUser;
		if (!user) {
			return;
		}

		const collectionRef = doc(
			this.firestore,
			'users',
			user.uid,
			'workbuckets',
			bucketId
		);

		const bucket: Partial<Workbucket> = description
			? { title, description, archived: false, allocation: allocation ?? 0, priority: priority ?? 1000 }
			: { title, archived: false, allocation: allocation ?? 0, priority: priority ?? 1000 };

		await updateDoc(collectionRef, bucket);
	}
}
