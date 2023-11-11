import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { Firestore, deleteDoc, doc, getDoc } from '@angular/fire/firestore';
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

    // delete token
    try {
      await deleteDoc(tokenRef);
      return user;
    } catch (err) {
      return null;
    }
  }
}
