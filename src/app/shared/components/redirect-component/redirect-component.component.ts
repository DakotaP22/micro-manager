import { Component, effect, inject, signal, Signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { signInAnonymously } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap, takeLast, tap } from 'rxjs';

@Component({
  selector: 'app-redirect-component',
  standalone: true,
  imports: [],
  // templateUrl: './redirect-component.component.html',
  template: `
    <p>{{ message() }}</p>
  `,
})
export class RedirectComponentComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  message: Signal<string> = toSignal(
    this.activatedRoute.data.pipe(map((data) => data['message']))
  );

  redirectUriArr = toSignal(
    this.activatedRoute.data.pipe(
      map((data) => data['redirectUri'] ?? []),
    ),
    { initialValue: [] }
  )


  constructor() {
    effect(() => {
      const redirectUriArr = this.redirectUriArr();
      if(redirectUriArr.length === 0) {
        return;
      }

      this.router.navigate(redirectUriArr);
    })
  }
}
