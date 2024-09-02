import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProfile, UserProfileAdapter, UserProfileFirebaseDTO } from '../models/UserProfile';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class UserService {
  firestore = inject(Firestore);

  async getUserProfile(user_id: string): Promise<UserProfile> {

    const userProfileCollection = collection(this.firestore, 'user-profiles');
    const docRef = doc(userProfileCollection, user_id);
    const userProfile = await getDoc(docRef);

    return UserProfileAdapter.fromFirebaseDto(user_id, userProfile.data() as UserProfileFirebaseDTO);
  }
}
