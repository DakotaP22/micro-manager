import { Route } from '@angular/router';
import { Observable } from 'rxjs';

export interface RedirectRoute extends Route {
  message?: string;
  redirectResolver: () => string[] | Observable<string[]> | Promise<string[]>;
}

export const redirect = (route: RedirectRoute) => {
  return {
    ...route,
    resolve: {
      redirectUri: route.redirectResolver,
      message: () => route.message,
    },
    loadComponent: () =>
      import(
        '../../../shared/components/redirect-component/redirect-component.component'
      ).then((m) => m.RedirectComponentComponent),
  };
};
