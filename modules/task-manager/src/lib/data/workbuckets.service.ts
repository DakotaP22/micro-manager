import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
	Firestore,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	updateDoc,
	where
} from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { Workbucket } from '../models/Workbucket';

@Injectable({ providedIn: 'root' })
export class WorkbucketsService {
	firestore = inject(Firestore);
	auth = inject(Auth);

	async getWorkbucketsForSignedInUser(): Promise<Workbucket[]> {
		// const user = await firstValueFrom(user(this.auth));
		const user = this.auth.currentUser
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
		});
	}

	async archiveBucket(bucketId: string): Promise<void> {
		const user = this.auth.currentUser
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
		const user = this.auth.currentUser
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

	async addBucket(title: string, description: string): Promise<void> {
		const user = this.auth.currentUser
		if (!user) {
			return;
		}

		const collectionRef = collection(
			this.firestore,
			'users',
			user.uid,
			'workbuckets'
		);

		const bucket: Partial<Workbucket> = { title, description, archived: false };
		await addDoc(collectionRef, bucket);
	}
}
