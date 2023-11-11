import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth.service';
import { ErrorNotificationService } from '@micro-manager/error-notification';

@Component({
  selector: 'auth-register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  authSvc = inject(AuthService);
  errorNotificationSvc = inject(ErrorNotificationService);
  router = inject(Router);

  registerForm = inject(FormBuilder).group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    confirmPassword: ['', [Validators.required, this.matchesPassword()]],
  });

  matcher = new MyErrorStateMatcher();

  private matchesPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = this.registerForm?.get('password')?.value ?? '';
      return control.value === password ? null : { Mismatch: true };
    };
  }

  async onRegisterClick() {
    const { email, password, confirmPassword } = this.registerForm.value;
    if (!email || !password || !confirmPassword) {
      this.errorNotificationSvc.notifyUser('Please fill out all fields');
      return;
    }

    if (password !== confirmPassword) {
      this.errorNotificationSvc.notifyUser('Passwords do not match');
    }

    try {
      await this.authSvc.registerUser(email, password);
      this.router.navigate(['/']);
    } catch (e) {
      this.errorNotificationSvc.notifyUser('Registration failed');
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
