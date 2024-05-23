import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { CreateUserProfileDTO } from '../models/CreateUserProfileDTO';
import { Auth, UserCredential, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({providedIn: 'root'})
export class RegistrationService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  async register(username: string, email: string, password: string, accessToken: string) {
    const userHasValidAccessToken = await this.validateAccessToken(accessToken);

    if(!userHasValidAccessToken) {
      throw new Error('Invalid access token.');
    }


    try {
      const user_id = await this.registerUser(email, password);
      await this.createUserProfile(user_id, username, email, accessToken);
      await this.deleteAccessToken(accessToken);
    } catch (err) {
      throw new Error("Regitration Failed.")
    }

  }

  async validateAccessToken(accessToken: string) {
    const accessTokenCollection = collection(this.firestore, 'beta-access-tokens');
    const accessTokenDoc = doc(accessTokenCollection, accessToken);
    const accessTokenSnapshot = await getDoc(accessTokenDoc);

    return accessTokenSnapshot.exists();
  }

  async deleteAccessToken(accessToken: string) {
    const accessTokenCollection = collection(this.firestore, 'beta-access-tokens');
    const accessTokenDoc = doc(accessTokenCollection, accessToken);
    await deleteDoc(accessTokenDoc);
  }

  async registerUser(email: string, password: string) {
    const userCreds: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user_id = userCreds.user.uid;
    return user_id;
  }

  async createUserProfile(user_id: string, username: string, email: string, access_token: string) {
    const dto: CreateUserProfileDTO = { user_id, username, email, access_token };

    const userProfileCollection = collection(this.firestore, 'user-profiles');
    const docRef = doc(userProfileCollection, user_id);
    await setDoc(docRef, dto);
  }


}
