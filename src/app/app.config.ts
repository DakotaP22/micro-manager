import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp, getApp } from '@angular/fire/app';
import { getFunctions, provideFunctions, connectFunctionsEmulator } from '@angular/fire/functions';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import {
  initializeFirestore,
  provideFirestore,
  connectFirestoreEmulator,
  getFirestore,
  Firestore,
} from '@angular/fire/firestore';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { environment } from '@micro-manager/environments';
import { MatMenuModule } from '@angular/material/menu';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(MatMenuModule),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation(), withComponentInputBinding()),
    provideAnimations(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase_config))
    ),
    importProvidersFrom(provideFirestore(() => {
      let firestore: Firestore;
      if (environment.useEmulators) {
        firestore = initializeFirestore(getApp(), {
          experimentalForceLongPolling: true,
        });
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      } else {
        firestore = getFirestore();
      }
      return firestore;
    })),
    importProvidersFrom(provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:9099', {
          disableWarnings: true,
        });
      }
      return auth;
    })),
    importProvidersFrom(provideFunctions(() => {
      const functions = getFunctions();
      if(environment.useEmulators) {
        connectFunctionsEmulator(functions, 'localhost', 5001);
      }
      return functions;
    })),
    importProvidersFrom(provideAnalytics(() => getAnalytics())),
    ScreenTrackingService,
    UserTrackingService,
  ],

};
