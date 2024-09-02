import { inject } from '@angular/core';
import { firstValueFrom, from, lastValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { UserProfile } from '../../auth/models/UserProfile';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../../auth/services/user.service';

export const defaultWorkbucketResolver: () => Observable<string[]> = () => {
  const authSvc = inject(AuthService);
  const userSvc = inject(UserService);

  return authSvc.idToken$.pipe(
    switchMap((idToken) => {
      if (!idToken) {
        return of(null); // redirect to login
      }

      return from(userSvc.getUserProfile(idToken));
    }),
    map((userProfile) => {
      if (!userProfile) {
        return ['auth', 'login']; // redirect to login
      }

      return [
        'workbucket',
        userProfile?.defaultWorkbucketId ?? 'create'
      ];
    })
  )
};
