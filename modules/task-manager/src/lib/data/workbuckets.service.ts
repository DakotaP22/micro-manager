import { Injectable, inject } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import {
	Firestore,
	QuerySnapshot,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	updateDoc,
	where
} from '@angular/fire/firestore';
import { EMPTY, Observable, from, map, of, switchMap } from 'rxjs';
import { Workbucket } from '../models/Workbucket';

@Injectable({ providedIn: 'root' })
export class WorkbucketsService {
	firestore = inject(Firestore);
	auth = inject(Auth);

	buckets$: Observable<Workbucket[]> = user(this.auth).pipe(
		map((user: User | null) => user?.uid),
		switchMap((userId: string | undefined) => {
			if (!userId) {
				return of([]);
			}

			return this.getWorkbucketsForUser$(userId);
		})
	);

	private getWorkbucketsForUser$(userId: string): Observable<Workbucket[]> {
		const collectionRef = collection(
			this.firestore,
			'users',
			userId,
			'workbuckets'
		);
		const q = query(collectionRef, where('archived', '==', false));
		const querySnapshot = getDocs(q);

		return from(querySnapshot).pipe(
			map((querySnapshot: QuerySnapshot) => {
				if (querySnapshot.empty) {
					return [];
				}

				return querySnapshot.docs.map((doc) => {
					return {
						id: doc.id,
						...doc.data(),
					} as Workbucket;
				});
			}),
			map((buckets: Workbucket[]) => buckets.sort((a, b) => a.title.localeCompare(b.title)))
		);
	}

	archiveBucket(bucketId: string): Observable<void> {
		return user(this.auth).pipe(
			switchMap((user: User | null) => {
				if (!user) {
					return EMPTY;
				}

				const collectionRef = doc(
					this.firestore,
					'users',
					user.uid,
					'workbuckets',
					bucketId
				);
				return from(updateDoc(collectionRef, { archived: true }))
			}),
		)
	}

	deleteBucket(bucketId: string) {
		return user(this.auth).pipe(
			switchMap((user: User | null) => {
				if (!user) {
					return EMPTY;
				}

				const collectionRef = doc(
					this.firestore,
					'users',
					user.uid,
					'workbuckets',
					bucketId
				);
				return from(deleteDoc(collectionRef))
			})
		)
	}

	addBucket(title: string, description: string) {
		return user(this.auth).pipe(
			switchMap((user: User | null) => {
				if (!user) {
					return EMPTY;
				}

				const collectionRef = collection(
					this.firestore,
					'users',
					user.uid,
					'workbuckets'
				);


				const bucket: Partial<Workbucket> = { title, description, archived: false };
				return from(addDoc(collectionRef, bucket));
			})
		)
	}
}
