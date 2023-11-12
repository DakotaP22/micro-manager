import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, serverTimestamp, setDoc } from '@angular/fire/firestore';
import { ErrorNotificationService } from '@micro-manager/error-notification';

@Injectable()
export class RegisterService {
  private readonly firestore = inject(Firestore);
  private readonly auth = inject(Auth);
  private readonly errorNotificationSvc = inject(ErrorNotificationService);

  async registerUser(email: string, password: string, access_code: string) {
    // get token
    const tokenRef = doc(this.firestore, 'AccessTokens', access_code);
    const token = await getDoc(tokenRef);
    
    // throw error if token does not exist
    if (!token.exists()) {
      throw new Error('Invalid access code');
    }

    // register user
    let user: UserCredential | null = null;
    try {
      user = await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (err) {
      throw new Error('Registration Failed');
    }

    // register user in database
    try {
      const newUser = {
        id: user.user?.uid ?? 'missing id',
        email,
        access_code,
        joined: serverTimestamp()
      }

      const collectionRef = collection(this.firestore, 'users');

      if (!user.user?.uid) {
        await addDoc(collectionRef, newUser);
      } else {
        const docRef = await doc(collectionRef, user.user.uid);
        await setDoc(docRef, newUser);
      }
    } catch (err) {
      return null;
    }

    // delete token
    try {
      await deleteDoc(tokenRef);
      return user;
    } catch (err) {
      return null;
    }
  }
}
