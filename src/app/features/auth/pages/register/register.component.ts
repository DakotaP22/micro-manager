import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegistrationService } from '../../services/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'register-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private authSvc = inject(AuthService);
  private registrationSvc = inject(RegistrationService);
  private snackbar = inject(MatSnackBar);
  private router = inject(Router);

  user = toSignal(this.authSvc.user$);

  registerForm = inject(FormBuilder).group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    betaAccessToken: ['', [Validators.required]],
  });

  constructor() {
    effect(() => {
      console.log('User:', this.user());
    });
  }

  register() {
    const { username, email, password, betaAccessToken } = this.registerForm.value;
    if (!!username && !!email && !!password && !!betaAccessToken) {
      this.registrationSvc.register(username, email, password, betaAccessToken)
      .then(() => {
        this.authSvc
          .signIn(email, password)
          .then(() => this.router.navigate(['/workbuckets']));
      })
      .catch((err) => this.snackbar.open(err.message, 'Close'));
    }
  }
}
