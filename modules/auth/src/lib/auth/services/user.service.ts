import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    firestore = inject(Firestore);

    getUser$(userId: string): Observable<User> {
        const collectionRef = collection(this.firestore, 'users');
        const docRef = doc(collectionRef, userId);
        
        const user$ = from(getDoc(docRef)).pipe(
            map((doc) => ({...doc.data()} as User))
        )
        return user$;
    }
    
}