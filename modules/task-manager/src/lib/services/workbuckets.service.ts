import { Injectable, inject } from '@angular/core';
import { Firestore, QuerySnapshot, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Workbucket } from '../models/Workbucket';

@Injectable({providedIn: 'root'})
export class WorkbucketsService {
    firestore = inject(Firestore);
    
    getWorkbucketsForUser$(userId: string): Observable<Workbucket[]> {
        const collectionRef = collection(this.firestore, 'users', userId, 'workbuckets');
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
            })
        );
    }
}